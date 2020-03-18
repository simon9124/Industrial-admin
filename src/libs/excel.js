/* eslint-disable */
import XLSX from "xlsx";

function auto_width(ws, data) {
  /*set worksheet max width per col*/
  const colWidth = data.map(row =>
    row.map(val => {
      /*if null/undefined*/
      if (val == null) {
        return {
          wch: 10
        };
      } else if (val.toString().charCodeAt(0) > 255) {
        /*if chinese*/
        return {
          wch: val.toString().length * 2
        };
      } else {
        return {
          wch: val.toString().length
        };
      }
    })
  );
  /*start in the first row*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]["wch"] < colWidth[i][j]["wch"]) {
        result[j]["wch"] = colWidth[i][j]["wch"];
      }
    }
  }
  ws["!cols"] = result;
}

function json_to_array(key, jsonData) {
  return jsonData.map(v =>
    key.map(j => {
      return v[j];
    })
  );
}

// fix data,return string
function fixdata(data) {
  let o = "";
  let l = 0;
  const w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

// get head from excel file,return array
function get_header_row(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  let C;
  const R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell =
      sheet[
        XLSX.utils.encode_cell({
          c: C,
          r: R
        })
      ]; /* find the cell in the first row */
    var hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

export const export_table_to_excel = (id, filename) => {
  const table = document.getElementById(id);
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, filename);

  /* the second way */
  // const table = document.getElementById(id);
  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.table_to_sheet(table);
  // XLSX.utils.book_append_sheet(wb, ws, filename);
  // XLSX.writeFile(wb, filename);
};

export const export_json_to_excel = ({
  data,
  key,
  title,
  filename,
  autoWidth
}) => {
  const wb = XLSX.utils.book_new();
  data.unshift(title);
  const ws = XLSX.utils.json_to_sheet(data, {
    header: key,
    skipHeader: true
  });
  if (autoWidth) {
    const arr = json_to_array(key, data);
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, filename + ".xlsx");
};

export const export_array_to_excel = ({
  key,
  data,
  title,
  filename,
  autoWidth
}) => {
  const wb = XLSX.utils.book_new();
  const arr = json_to_array(key, data);
  arr.unshift(title);
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, filename + ".xlsx");
};

export const read = (data, type) => {
  /* if type == 'base64' must fix data first */
  // const fixedData = fixdata(data)
  // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
  const workbook = XLSX.read(data, {
    type: type
  });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = get_header_row(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return {
    header,
    results
  };
};

// 读取文件 - 多级表头返回原始json
export const readMergeHeader = (data, type) => {
  /* if type == 'base64' must fix data first */
  // const fixedData = fixdata(data)
  // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
  const workbook = XLSX.read(data, {
    type: type
  });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  // const header = get_header_row(worksheet);
  // const results = XLSX.utils.sheet_to_json(worksheet);
  return worksheet;
};

/* 多级表头导入使用 */
/**
 * *将单元格标识转为行列坐标
 * @param cellId 单元格歀 如A1、DF12
 */
function cellIdToNumIndex(cellId, r) {
  let carray = cellId
    .replace(/[0-9]/gi, "")
    .replace(/(.)(?=[^$])/g, "$1,")
    .split(",");
  let c = (carray.length - 1) * 26;
  carray.forEach(o => {
    c += o.charCodeAt() - 65;
  });
  r = r || parseInt(cellId.replace(/[^0-9]/gi, ""));

  return {
    r: r - 1,
    c: c
  };
}

/**
 * th元素生成器
 * @param cellTag  单元格标签 A1/AD5
 * @param rowspan  跨行数
 * @param colspan   跨列数
 * @param text  内容
 */
function buildThDom(cellTag, rowspan, colspan, text) {
  rowspan = rowspan || 1;
  colspan = colspan || 1;
  text = text || "";
  return `<th tag="${cellTag}" rowspan="${rowspan}" colspan="${colspan}">${text}</th>`;
}

/**
 * *将表头配置信息按行区分
 * @param headConfig
 */
function headGroupbyRow(headConfig) {
  let rowObj = {};
  for (let k in headConfig) {
    if (k.lastIndexOf("!") > -1) continue;
    let r = k.replace(/[^0-9]/gi, "");
    rowObj[`r${r}`] = rowObj[`r${r}`] || [];
    rowObj[`r${r}`][k] = headConfig[k];
  }
  return rowObj;
}

/**
 * 生成原始表格Html
 * @param maxCellId 最大单元格标识
 */
export const builderOriginalHtml = maxCellId => {
  let maxObj = cellIdToNumIndex(maxCellId);
  let jqTrDom = {};
  for (let r = 0; r <= maxObj.r; r++) {
    let trDomArray = [];
    for (let c = 0; c <= maxObj.c; c++) {
      let tag = null;
      if (c > 50) alert("表格列数太，请联系管理员");
      else if (c > 25) {
        tag = `A${String.fromCharCode(c - 25 + 65)}${r + 1}`;
      } else tag = `${String.fromCharCode(c + 65)}${r + 1}`;

      trDomArray.push(buildThDom(tag));
    }
    jqTrDom[`r${r + 1}`] = trDomArray;
  }
  return jqTrDom;
};

/**
 * 单元格标识升序排序
 * @param a 第一个值
 * @param b 第二个值
 * 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
 * 若 a 等于 b，则返回 0。
 * 若 a 大于 b，则返回一个大于 0 的值。
 */
function cellIdSort(a, b) {
  let cellAXY = cellIdToNumIndex(a);
  let cellBXY = cellIdToNumIndex(b);

  if (cellAXY.r === cellBXY.r) return cellAXY.c - cellBXY.c;

  return cellAXY.r - cellBXY.r;
}

/**
 * 生成Dom元素
 * @param headConfig 表头信息
 * @param originalDom 原始tableDom元素
 */
export const builderHtml = (headConfig, originalDom) => {
  let rowObjs = headGroupbyRow(headConfig); //把表示信息按行分组;
  let rowKeys = Object.keys(rowObjs).sort(); //把行信息按从小到大排序
  for (let i in rowKeys) {
    let rk = rowKeys[i];
    let rowObj = rowObjs[rk];
    let onerowcell = Object.keys(rowObj).sort(cellIdSort); //同一行的单元格排序

    let rowMerges = headConfig["!merges"].filter(o => {
      return o.s.r == i;
    }); //当前行的所有合并单元格样式

    //处理有表头信息的单元格
    for (let j in onerowcell) {
      let ck = onerowcell[j];
      let colObj = rowObj[ck]; //单元格对象
      let rcIndexObj = cellIdToNumIndex(ck); //单元格的行列坐标，都是从0开始;

      let cellMergeIndex = rowMerges.findIndex(o => {
        return o.s.c == rcIndexObj.c;
      }); //cellMergeIndex

      if (cellMergeIndex > -1) {
        let cmObj = rowMerges[cellMergeIndex];
        let rowspan = 1,
          colspan = 1;
        rowspan += cmObj.e.r - cmObj.s.r;
        colspan += cmObj.e.c - cmObj.s.c;

        originalDom[rk][rcIndexObj.c] = buildThDom(
          ck,
          rowspan,
          colspan,
          colObj.v
        ); //`<th style="border:1px solid #F00 ;" rowspan="${rowspan}" colspan="${colspan}">${colObj.v}</th>`;

        for (let r = cmObj.s.r; r <= cmObj.e.r; r++) {
          let startRowSpan = r > cmObj.s.r;
          for (let s = cmObj.s.c; s <= cmObj.e.c; s++) {
            if (startRowSpan) {
              //处理被跨行的单元格
              delete originalDom[`r${r + 1}`][s];
              continue;
            }
            if (s == cmObj.s.c) continue;
            delete originalDom[`r${r + 1}`][s];
          }
        }
        rowMerges.splice(cellMergeIndex, 1); //清除当前行已处理的合并单元格配置

        cmObj = null;
      } else originalDom[rk][rcIndexObj.c] = buildThDom(ck, 1, 1, colObj.v); //`<th style="border:1px solid #F00 ;">${colObj.v}</th>`;
    }

    //处理无表头信息，但有合并配置信息的单元格
    rowMerges.forEach(cmObj => {
      let rowspan = 1;
      let colspan = 1;
      rowspan += cmObj.e.r - cmObj.s.r;
      colspan += cmObj.e.c - cmObj.s.c;

      let tag = null;
      if (cmObj.s.c > 50) alert("表格列数太，请联系管理员");
      else if (cmObj.s.c > 25) {
        tag = `A${String.fromCharCode(cmObj.s.c - 25 + 65)}${cmObj.s.r + 1}`;
      } else tag = `${String.fromCharCode(cmObj.s.c + 65)}${cmObj.s.r + 1}`;

      originalDom[rk][cmObj.s.c] = buildThDom(tag, rowspan, colspan, ""); // `<th style="border:1px solid #F00 ;" rowspan="${rowspan}" colspan="${colspan}"> </th>`;

      for (let r = cmObj.s.r; r <= cmObj.e.r; r++) {
        let startRowSpan = r > cmObj.s.r;
        for (let s = cmObj.s.c; s <= cmObj.e.c; s++) {
          if (startRowSpan) {
            delete originalDom[`r${r + 1}`][s];

            continue;
          }
          if (s == cmObj.s.c) continue;
          delete originalDom[`r${r + 1}`][s];
        }
      }
    });
  }
};

/**
 * 将生成的Html写入表格
 * @param jqTrDom
 */
export const writeToTable = (contentId, jqTrDom) => {
  let theadDom = document.createElement("thead"); //表行容器Dom对象
  for (let k in jqTrDom) {
    let trDom = document.createElement("tr");
    jqTrDom[k].forEach(o => {
      // console.log(o);
      if (o) {
        /* 将字符串转换为dom节点 */
        let thDoc = new DOMParser().parseFromString(o, "text/xml");
        let thNode = thDoc.getElementsByTagName("th")[0];
        // console.log(thNode);
        trDom.append(thNode);
      }
    });
    theadDom.append(trDom);
    // console.log(trDom);
  }
  // console.log(theadDom);
  return theadDom;
};

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_json_to_excel,
  read,
  readMergeHeader,
  builderOriginalHtml,
  builderHtml,
  writeToTable
};
