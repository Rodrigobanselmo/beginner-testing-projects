const { File, Footer, Table,Header,Media,TableRow,TableCell,BorderStyle, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents } = require("docx");
const fs = require("fs");

const doc = new File({
    styles: {
        paragraphStyles: [
            {
                id: "MySpectacularStyle",
                name: "My Spectacular Style",
                basedOn: "Heading1",
                next: "Heading1",
                quickFormat: true,
                run: {
                    italics: true,
                    color: "990000",
                },
            },
        ],
    },
});

const table = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [new Paragraph("Hello")],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [], 
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [new Paragraph("Hello")],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [], 
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [new Paragraph("Hello")],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [], 
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
                new TableCell({
                    children: [],
                    borders: {top: {style: BorderStyle.none,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                }),
            ],
        }),
    ],
});

const image = Media.addImage(doc, fs.readFileSync("./assets/logo.png"), 70, 70, )

doc.addSection({
    children: [table
    ],
});




Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});









