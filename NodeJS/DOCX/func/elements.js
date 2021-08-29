const { File, Footer,TextDirection, PageBreak,Table,ShadingType,TextWrappingType,TextWrappingSide,Header, PageNumber, PageNumberFormat, PageOrientation,AlignmentType,WidthType,Media,TableRow,TableCell,BorderStyle, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents, VerticalAlign } = require("docx");
const fs = require("fs");

module.exports = {

    ImageGenerate: (img,x,y,doc) => {
        const image = Media.addImage(doc, fs.readFileSync(img), x, y, )
        return image
    },

    ImageBackground: (img,doc) => {
        const image = Media.addImage(doc, fs.readFileSync(img), 795, 1125, {
            floating: {
                horizontalPosition: {
                    offset: 0,
                },
                verticalPosition: {
                    offset: 0,
                },
            },
        });
        return image
    },

    BreakLine: () => {

        const Break = new Paragraph("")

        return (Break)
    },

    BreakPage: () => {

        const Break = new Paragraph({pageBreakBefore: true})

        return (Break)
    },

    Summary: (title,type) => {

        var titulo = ""

        switch (type) {
            case 1:
                titulo=title
                break;
            case 2:
                titulo=`             ${title}`
                break;
            case 3:
                titulo=`                 ${title}`
                break;
        
            default:
                titulo=title
                console.log('insert a type param')
                break;
        }

        return (
            [new Paragraph({
                children: [
                    new TextRun({
                        text: titulo,
                        size:32,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph("")]
        )
    },

    TableContents: (title,type) => {

        var headingStyleRange =""

        switch (type) {
            case 1:
                headingStyleRange = "1-4"
                break;
            case 2:
                headingStyleRange = "5-5"
                break;
            case 3:
                headingStyleRange = "6-6"
                break;
        
            default:
                break;
        }

        const tableOfContents = new TableOfContents(title, {
            hyperlink: true,
            headingStyleRange:headingStyleRange,
            stylesWithLevels: [new StyleLevel("MySpectacularStyle1", 1)],
        });

        return (tableOfContents)
    },

    TableHeader: (image) => {
        const tableHeader = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [ new Paragraph(image)],
                            borders: {top: {style: BorderStyle.NONE,size: 3,color: "transparent",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.NONE,size: 3,color: "transparent",},right: {style: BorderStyle.NONE,size: 3,color: "transparent",},},
                            width: {
                                size: '100%',
                                type: WidthType.PERCENTAGE
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            children: [PageNumber.CURRENT],
                                        }),
                                    ],
                                }),
                            ],
                            verticalAlign:VerticalAlign.CENTER,
                            borders: {top: {style: BorderStyle.NONE,size: 3,color: "transparent",}, bottom: {style: BorderStyle.NONE,size: 3,color: "transparent",},left: { style: BorderStyle.NONE,size: 3,color: "transparent",},right: {style: BorderStyle.NONE,size: 3,color: "transparent",},},
                        }),
                    ],
                }),
            ],
             margins: {
                 marginUnitType: WidthType.DXA,
                 top: 0,
                 bottom: 100,
                 right: 0,
                 left: 0,
            }
        });

        return (tableHeader)
    },

    TableFooter: (image,title,part,date,rev) => {
        const tableFooter = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: title,
                                            size:16,
                                            bold:true
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: part,
                                            size:16,
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${rev} — ${date}`,
                                            size:16,
                                        }),
                                    ],
                                }),
                            ],
                            verticalAlign:VerticalAlign.CENTER,
                            borders: {top: {style: BorderStyle.SINGLE,size: 3,color: "#d75627",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                            width: {
                                size: '100%',
                                type: WidthType.PERCENTAGE
                            },
                        }),
                        new TableCell({
                            children: [ new Paragraph(image)],
                            borders: {top: {style: BorderStyle.SINGLE,size: 3,color: "#d75627",}, bottom: {style: BorderStyle.none,size: 3,color: "transparent",},left: { style: BorderStyle.none,size: 3,color: "transparent",},right: {style: BorderStyle.none,size: 3,color: "transparent",},},
                        }),
                    ],
                }),
            ],
            margins: {
                marginUnitType: WidthType.DXA,
                top: 100,
                bottom: 0,
                right: 0,
                left: 0,
            }
        });

        return (tableFooter)
    },

    CoverOfChapterOne: (title,part,date,rev) => {
        return [
            new Paragraph({
                children: [
                    new TextRun({
                        text: title,
                        size:30,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                    after: 5800,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: part,
                        size:28,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
/*                 spacing: {
                    after: 6000,
                }, */
            }),
        ]
    },

    CoverOfChapterTwo: (title,part,subTitle) => {
        return [
            new Paragraph({
                children: [
                    new TextRun({
                        text: title,
                        size:30,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                    after: 4400,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: part,
                        size:28,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                    after: 3100,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: subTitle,
                        size:28,
                        bold:true,
                    }),
                ],
                alignment: AlignmentType.CENTER,
            }),
            
        ]
    },

    TextNormal: (text,style) => {
        var textRun;

        if (style) textRun = new TextRun({text: text,size:22,...style})
        if (!style) textRun = new TextRun({text: text,size:22})
        return textRun

    },

    ParagraphSpacing: (children,space) => {
        return new Paragraph({
                    children: [...children],
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        after: space?space:160,
                    },
                })
                
    },

    ParagraphNormal: (children) => {
        return new Paragraph({
                    children: [...children],
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 120,
                    },
                })
 
    },
    
    BulletParagraph: (children,level) => {
        return new Paragraph({
            children: [...children],
            bullet: {
                level: level ? level : 0,
            },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                after: 120,
            },
        })
        
    },
    
    Heading_1: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                        after: 200,
                    },
                })
                
    },

    Heading_2: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_2,
                    spacing: {
                        after: 200,
                    },
                })
                
    },

    Heading_3: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_3,
                    spacing: {
                        after: 130,
                    },
                })
                
    },

    Heading_4: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_4,
                    spacing: {
                        after: 130,
                    },
                })
                
    },

    Heading_5: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_5,
                    spacing: {
                        after: 120,
                    },
                })
                
    },

    Heading_6: (text) => {
        return new Paragraph({
                    text:text,
                    alignment: AlignmentType.JUSTIFIED,
                    heading: HeadingLevel.HEADING_6,
                    spacing: {
                        after: 120,
                    },
                })
                
    },

    Table: (data) => {

        let numRows = data.rows
        let numColumns = data.columns
        let matrix = []
        let matrixCells = []
        let noCells = []
        
        function createText(text,style,styles) {
            return new TextRun({
                text: text,
                size:13,
                ...styles,
                ...style
            })
        }
        
        function createParagraph(children,paragraphChild) {
            return new Paragraph({
                children: [...children],
                spacing: {
                    after: 30,
                    before: 30
                },
                ...paragraphChild
            })
        }

        function createParagraphs(indexRow,indexCol,paragraphChild) {
            var PARAGRAPH = []
            var TEXT = []
            if (data.position[`p${indexRow}_${indexCol}`]) {
                let position = data.position[`p${indexRow}_${indexCol}`]
                position.forEach(paragraphs => {
                    paragraphs.forEach(textData => {
                        TEXT.push(createText(textData.text,textData.style?textData.style:{},indexRow=='1'||indexCol=='1'?{bold:true}:{}))
                    });
                    PARAGRAPH.push(createParagraph(TEXT,paragraphChild))
                    TEXT = []
                });
            } else {
                PARAGRAPH.push(new Paragraph({text:'',...paragraphChild}))
            }
            return PARAGRAPH

        }


        function createColumnSquare(indexRow,indexCol) {
            function createTabCell() {
                let options = {
                    verticalAlign:VerticalAlign.CENTER,
                    margins:{
                        left:50,
                        right:50,
                    }
                }

                if (data.sizes[indexCol-1]) options.width = {size: data.sizes[indexCol-1] ? data.sizes[indexCol-1] : 100,type: WidthType.PERCENTAGE}

                let paragraphChild = {alignment: AlignmentType.CENTER}

                matrix.forEach(e => {     
                    if (e.start[0]<=`${indexRow}` && e.start[1]<=`${indexCol}` && e.end[0]>=`${indexRow}` && e.end[1]>=`${indexCol}`) {
                        paragraphChild = {...paragraphChild,...data.childParagraphs[`${e.key}`]}
                    }
                });
                matrixCells.forEach(e => {                
                    if (e.start[0]<=`${indexRow}` && e.start[1]<=`${indexCol}` && e.end[0]>=`${indexRow}` && e.end[1]>=`${indexCol}`) {
                        options = {...options,...data.childCells[`${e.key}`]}
                    }
                });

                if (data.childParagraphs) {
                    for (const key in data.childParagraphs) {
                        let array = key.substring(0,key.length-1).slice(-(key.length-2)).split('_', 2)
                        if (array[0] == indexRow && array[1] == indexCol) {
                            let lastChar = key.substring(key.length-1,key.length)
                            if ( lastChar !='e' && lastChar != 'i') {
                                for (const find in data.childParagraphs) {
                                    if (find.substring(find.length-1,find.length) =='e' && key == data.childParagraphs[`${find}`]) {
                                        paragraphChild = {...paragraphChild,...data.childParagraphs[`${key}`]}
                                        let end = find.substring(0,find.length-2).slice(-(find.length-3)).split('_', 2)
                                        matrix = [...matrix,{key,end,start:[array[0],array[1]]}]
                                    }
                                }
                            } else { 
                            paragraphChild = {...paragraphChild,...data.childParagraphs[`${key}`]}
                            }
                        }
                    }
                }   

                if (data.childCells) {
                    for (const key in data.childCells) {
                        let array = key.substring(0,key.length-1).slice(-(key.length-2)).split('_', 2)
                        if (array[0] == indexRow && array[1] == indexCol) {
                            let lastChar = key.substring(key.length-1,key.length)
                            if ( lastChar !='e' && lastChar != 'i') {
                                for (const find in data.childCells) {
                                    if (find.substring(find.length-1,find.length) =='e' && key == data.childCells[`${find}`]) {
                                        options = {...options,...data.childCells[`${key}`]}
                                        let end = find.substring(0,find.length-2).slice(-(find.length-3)).split('_', 2)
                                        matrixCells = [...matrixCells,{key,end,start:[array[0],array[1]]}]
                                    }
                                }
                            } else {
                            options = {...options,...data.childCells[`${key}`]}
                            if (data.childCells[`${key}`].columnSpan) noCells = [...noCells,{row:indexRow,toColumn:indexCol+data.childCells[`${key}`].columnSpan-1}]
                            }
                        }
                    }
                }   

                
                const  paragraphs = createParagraphs(indexRow,indexCol,paragraphChild)
                return (
                    new TableCell({
                        children: [...paragraphs],
                        ...options
                    })
                )
            }

            var CELL;

            if (noCells.length >0) { 
                noCells.forEach(cell => {
                    if (cell.row == indexRow && cell.toColumn >= indexCol) {
                        CELL = false
                    } else {
                        CELL = createTabCell()
                    }
                });
            } else {
                CELL = createTabCell()
            }

            return CELL
        }

        function createRow(children) {
            return new TableRow({
                children: [...children],
            })
        }

        var tableRows = []

        for (let indexRow = 1; indexRow <= numRows; indexRow++) {
            var COLUMNS = []
            for (let indexCol = 1; indexCol <= numColumns; indexCol++) {
                let cell =  createColumnSquare(indexRow,indexCol)
                if (cell === false) {} else COLUMNS.push(cell)
            }      
            tableRows.push(createRow(COLUMNS))
        }

        const table = new Table({
            rows: [...tableRows],

            width: {
                size: 100,
                type: WidthType.PERCENTAGE
            },
        }); 
        
        return (table)
    },
}
