const { File,Document, Footer,FootnoteReferenceRun, Header,Media, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents } = require("docx");
const fs = require("fs");

const doc = new Document({
    footnotes: [
        new Paragraph("Foo"),
        new Paragraph("Test"),
        new Paragraph("My amazing reference"),
        new Paragraph("Foo1"),
        new Paragraph("Test1"),
        new Paragraph("My amazing reference1"),
    ],
});

doc.addSection({
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    children: ["Hello", new FootnoteReferenceRun(1)],
                }),
                new TextRun({
                    children: [" World!", new FootnoteReferenceRun(2)],
                }),
            ],
        }),
        new Paragraph({
            children: [new TextRun("Hello World"), new FootnoteReferenceRun(3)],
        }),
    ],
});

doc.addSection({
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    children: ["Hello", new FootnoteReferenceRun(4)],
                }),
                new TextRun({
                    children: [" World!", new FootnoteReferenceRun(5)],
                }),
            ],
        }),
        new Paragraph({
            children: [new TextRun("Hello World"), new FootnoteReferenceRun(6)],
        }),
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});


/* 







doc.addSection({
    headers: {
        default: new Header({
            children: [
                new Paragraph({
                    children: [
                        image,
                        new TextRun({
                            text: "Realiza Soluções em Medicina e Segurança do Trabalh0",
                            bold:true,
                            size:26,
                            break: 2,
                        }),
                        new TextRun({
                            text: "Av. Alberto Bins, 658/402 - Centro - Porto Alegre - RS",
                            size:26,
                            break: 2,
                        }),
                        new TextRun({
                            text: "Fone: 51 3224-0032",
                            size:26,
                            break: 2,
                        }),
                    ],
                }),
            ],
        }),
    },
    footers: {
        default: new Footer({
            children: [new Paragraph("Footer text")],
        }),
    },
    children: [
        new TableOfContents("Summary", {
            hyperlink: true,
            headingStyleRange: "1-5",
            stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
        }),
        new Paragraph({
            text: "Header #1",
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
        }),
        new Paragraph("I'm a little text very nicely written.'"),
        new Paragraph({
            text: "Header #2",
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
        }),
        new Paragraph("I'm a other text very nicely written.'"),
        new Paragraph({
            text: "Header #2.1",
            heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph("I'm a another text very nicely written.'"),
        new Paragraph({
            text: "My Spectacular Style #1",
            style: "MySpectacularStyle",
            pageBreakBefore: true,
        }),
    ],
}); */