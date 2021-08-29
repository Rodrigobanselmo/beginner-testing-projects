const { File, Footer, Header,Media, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents } = require("docx");
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


const image = Media.addImage(doc, fs.readFileSync("./assets/logo.png"), 70, 70, )

doc.addSection({
    headers: {
        default: new Header({
            children: [
                new Paragraph({
                    children: [
                        image,
                        new TextRun({
                            children: ["Realiza Soluções em Medicina e Segurança do Trabalh0"]
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
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});









