/* eslint-disable */
import XLSX from "xlsx-style";
// import XLSX from "./xlsx.full.min.js"

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
  // console.log(jqTrDom);
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
        // console.log(thNode.firstChild);
        // if (thNode.firstChild !== null) {
        trDom.append(thNode);
        // }
      }
    });
    theadDom.append(trDom);
    // console.log(trDom);
  }
  // console.log(theadDom);
  return theadDom;
};

//-----------------------cgh  xls-style 工具类
export const xlsxUtils = {
  Binary: {
    fixdata(data) { //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    s2ab(s) { //字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  },
  _wb: null,
  _rABS: false,
  /**
   * @desc  导入根据文件
   * @param {File} f 文件
   * @param {Function} c 回调
   * @return {Object} 回调值
   */
  import(f, c) {
    this.wb = null;
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      xlsxUtils._wb = xlsxUtils._rABS ? XLSX.read(btoa(xlsxUtils.Binary.fixdata(data)), { type: 'base64' }) : XLSX.read(data, { type: 'binary' });
      if (typeof c == "function") { c(xlsxUtils._wb); }
    };
    if (xlsxUtils._rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  },
  /**
   * @desc  根据表Sheet名获取数据
   * @param {String} name
   * @return {Object}
   */
  getSheetByName(name) {//
    return XLSX.utils.sheet_to_json(xlsxUtils._wb.Sheets[name]);
  },
  /**
   * @desc  根据表Sheet索引获取数据
   * @param {Number} index
   * @return {Object}
   */
  getSheetByIndex(index = 0) {
    return xlsxUtils.getSheetByName(xlsxUtils._wb.SheetNames[index]);
  },
  /**
   * @desc 导出
   * @param {Array} data 数据{title1:dataList,title2:dataList....}
   * @param {String} type
   * @return {Blob}
   */
  export(data, type) {
    var tmpWB = null;
    for (var title in data) {
      var tmpdata = xlsxUtils.format2Sheet(data[title]);
      tmpWB = xlsxUtils.format2WB(tmpdata, title, tmpWB);
    }
    return xlsxUtils.format2Blob(tmpWB, type);
  },
  /**
   * 从数据数组或对象中根据key生成相同key值的对象
   * @param {Object|Array} data
   * @return {Object}
   */
  readDataHead(data) {
    var o = {}, d = Array.isArray(data) ? Object.keys(data[0]) : data; for (var i of d) o[i] = i;
    return o;
  },
  /**
   * @desc 格式化数据为Sheet格式
   * @param {Array} json 数据
   * @param {Number} n 列偏移
   * @param {Number} r 行偏移
   * @param {Array} keyMap 对象键数组
   * @param {Function|Boolean} t 数据
   */
  format2Sheet(json, n, r, keyMap, t) {
    keyMap = keyMap || Object.keys(json[0]);
    var types = (t == undefined ? ((v) => (({ "number": "n", undefined: "s", "boolean": "b", "string": "s" })[typeof v]) || "s") : t);
    n = n || 0;
    r = r || 0;
    var tmpdata = {};//用来保存转换好的json
    var t1 = json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: ((j + n) > 25 ? xlsxUtils.getCharCol((j + n)) : String.fromCharCode(65 + (j + n))) + (i + 1 + r),
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
      v: v.v,
      t: types ? types(v.v) : "s",
      s: {
        font: { name: "宋体", sz: 11, color: { auto: 1 } },
        border: {
          color: { auto: 1 }
        },
        alignment: {
          /// 自动换行
          wrapText: 1,
          // 居中
          horizontal: "center",
          vertical: "center",
          indent: 0
        }
      }
    });
    return tmpdata;
  },
  /**
   * @desc 格式化数据为Sheet格式
   * @param {Array} sheetData
   * @param {String} title
   * @param {Object} wb
   * @param {Object} ref
   */
  format2WB(sheetData, title, wb, ref) {
    title = title || "mySheet";
    var outputPos = Object.keys(sheetData);
    if (!wb) wb = { Sheets: {}, SheetNames: [] };
    wb.SheetNames.push(title);
    wb.Sheets[title] = Object.assign({}, sheetData, {
      '!ref': ref || (outputPos[0] + ':' + outputPos.reverse().find(_ => _.indexOf("!") == -1))//设置填充区域
    });
    return wb;
  },
  /**
   * @desc 将xlsx Workbook 转为blob
   * @param {Array} wb
   * @param {String} type 类型
   */
  format2Blob(wb, type) {
    return new Blob([xlsxUtils.Binary.s2ab(XLSX.write(wb,
      { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
    ))], { type: "" });
  },
  /**
   * @desc 匹配单元格对应的标识
   * @param {Number} n
   */
  getCharCol(n) {
    let temCol = '',
      s = '',
      m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },
  /**
   *
   * @param headDate 头数据，与导入的一样
   * @param s 默认表头样式
   */
  setHeaderStyle(headData, s) {
    s = s || {
      font: { name: "宋体", sz: 11, color: { auto: 1 } },
      border: {
        color: { auto: 1 }
      },
      alignment: {
        /// 自动换行
        wrapText: 1,
        // 居中
        horizontal: "center",
        vertical: "center",
        indent: 0
      }
    };

    if (headData) {
      for (let k in headData) {
        if (k.indexOf("!") == -1) {
          headData[k].s = s;
        }
      }
    }
  }
}

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_json_to_excel,
  read,
  readMergeHeader,
  builderOriginalHtml,
  builderHtml,
  writeToTable,
  xlsxUtils
};
