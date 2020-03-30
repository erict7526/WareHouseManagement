import jsPDF from "jspdf";
import huninnFont from "./font/jf-openhuninn-1.0-normal.js";
import taipeiFont from "./font/TaipeiSansTCBeta-Regular-normal.js";

const doc = new jsPDF();

doc.addFileToVFS("huninnFont.ttf", huninnFont);
doc.addFileToVFS("taipeiFont.ttf", taipeiFont);
doc.addFont("huninnFont.ttf", "huninnFont", "normal");
doc.addFont("taipeiFont.ttf", "taipeiFont", "normal");
doc.setFont("huninnFont");
doc.setFontStyle("normal");

doc.text("南區資源回收廠", 10, 10);
doc.setFont("taipeiFont");
doc.setFontStyle("normal");
doc.text("南區資源回收廠", 10, 20);

doc.autoPrint();

doc.output("dataurlnewwindow");
