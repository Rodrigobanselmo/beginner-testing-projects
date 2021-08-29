const { File, Footer, PageBreak,Table,TextWrappingType,TextWrappingSide,Header, PageNumber, PageNumberFormat, PageOrientation,AlignmentType,WidthType,Media,TableRow,TableCell,BorderStyle, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents, VerticalAlign } = require("docx");
const elements = require("./elements.js")

module.exports = function createSection(doc,docInfo) {

    var tableNumber = 1
    var numPageInit={pageNumberStart: 1,pageNumberFormatType: PageNumberFormat.DECIMAL,}
    var numPage={pageNumberFormatType: PageNumberFormat.DECIMAL,}

    function addContentById(contentId) {
        
        const BLOCK = []
        
        //get an array of paragraphs 
        if (docInfo.content[`${contentId}`])
        docInfo.content[`${contentId}`].forEach((item) => {       
            //see in each array if it is a paragraph, bullet ... 
            var INSIDE_BLOCK = []

            switch (item.type) {
                case 'paragraph':
                    //if is a paragraph will get all the sentences and put the correct style and specialty
                    if (item.show) {
                        item.contentParagraph.forEach((itemContent) => {
                            if (itemContent.special) {
                                
                            } else {
                                INSIDE_BLOCK.push(elements.TextNormal(itemContent.text,itemContent.style))
                            }
                        });
                        
                        BLOCK.push(elements.ParagraphNormal(INSIDE_BLOCK))
                        INSIDE_BLOCK = []
                    }
                    break;

                case 'paragraphSpacing':
                    //if is a paragraph will get all the sentences and put the correct style and specialty
                    if (item.show) {
                        item.contentParagraph.forEach((itemContent) => {
                            if (itemContent.special) {
                                
                            } else {
                                INSIDE_BLOCK.push(elements.TextNormal(itemContent.text,itemContent.style))
                            }
                        });
                        
                        BLOCK.push(elements.ParagraphSpacing(INSIDE_BLOCK))
                        INSIDE_BLOCK = []
                    }
                    break;

                case 'bullet':
                    //if is a bullet paragraph will get all the bullet text and sentences and put the correct style and specialty
                    if (item.show) {
                        var addBullet = false
                        item.contentParagraph.forEach((itemContent) => {
                            itemContent.forEach((textContent) => {
                                if (textContent.show) {
                                    if (textContent.special) {
                                        
                                    } else {
                                        if (!addBullet) addBullet = true
                                        INSIDE_BLOCK.push(elements.TextNormal(textContent.text,textContent.style))
                                    }
                                }
                            });
                            if (addBullet) {
                                BLOCK.push(elements.BulletParagraph(INSIDE_BLOCK))
                                addBullet = false
                                INSIDE_BLOCK = []
                            }
                        });
                    }   
                    break;

                case 'arrayResponsible':
                    //if is a paragraph will get all the sentences and put the correct style and specialty
                    if (item.show) {
                        item.contentParagraph.responsible.forEach((company) => {
                            BLOCK.push(elements.ParagraphSpacing([elements.TextNormal(company.company,{bold:true})],250))
                            BLOCK.push(elements.ParagraphSpacing([elements.TextNormal('Profissionais:',{bold:true})]))
                            company.employees.forEach((employee) => {
                                var person = item.contentParagraph.professionals.find(i=>i.id==employee)
                                //console.log(person)
                                //console.log(item.contentParagraph.professionals.find(i=>console.log(i.id,employee)))
                                if (person.name) BLOCK.push(elements.ParagraphSpacing([elements.TextNormal(`\t${person.name}`,{})]))
                                if (person.office && person.office.length > 0 ) {
                                    person.office.forEach((office, indexOffice) => {
                                        INSIDE_BLOCK.push(elements.TextNormal(`${indexOffice == 0 ?'\t':'/'}${office}`,{}))
                                    });
                                    BLOCK.push(elements.ParagraphSpacing(INSIDE_BLOCK))
                                    INSIDE_BLOCK = []
                                }
                                if (person.CREA) BLOCK.push(elements.ParagraphSpacing([elements.TextNormal(`\tCREA: ${person.CREA}`,{})]))
                                if (person.department && person.department.length > 0) {
                                    person.department.forEach((department, indexDepartment) => {
                                        INSIDE_BLOCK.push(elements.TextNormal(`${indexDepartment == 0 ?'\t':' – '}${department}`,{}))
                                    });
                                    BLOCK.push(elements.ParagraphSpacing(INSIDE_BLOCK))
                                    INSIDE_BLOCK = []
                                }
                                if (person.certifications && person.certifications.length > 0) {
                                    person.certifications.forEach((certifications, indexCertifications) => {
                                        INSIDE_BLOCK.push(elements.TextNormal(`${indexCertifications == 0 ?'\t':' – '}${certifications}`,{}))
                                    });
                                    BLOCK.push(elements.ParagraphSpacing(INSIDE_BLOCK))
                                    INSIDE_BLOCK = []
                                }
                                BLOCK.push(elements.ParagraphSpacing([elements.TextNormal('',{})]))
                            });
                        });
                    }
                    break;
                
                case 'pageBreakBefore':
                    if (item.show) {
                        BLOCK.push(new Paragraph({pageBreakBefore: true}),)
                    }
                    break;

                case 'table':
                    if (item.show) {
                        if (docInfo.tables[`${item.data}`]) {
                            BLOCK.push(elements.Heading_5(`Tabela ${tableNumber}: ${docInfo.tables[`${item.data}`].name}`))
                            tableNumber = tableNumber+1
                            BLOCK.push(elements.Table(docInfo.tables[`${item.data}`]))
                            BLOCK.push(elements.ParagraphSpacing([elements.TextNormal('',{})]))
                        }
                    }
                    break;
                
                default:
                    break;
            }

        });
        return BLOCK
    }

    function createSubParts(part,indexPart,introCover) {

        var PART = []
        if (part.breakPageBefore) PART.push(elements.BreakPage())
        PART.push(elements.Heading_1(`PARTE 0${indexPart+1} – ${part.title}`))

        function createSubItems(items,indexItems,indexSubParts) {
            if (items.subItems)
            items.subItems.forEach((subItems,indexSubItems) => {
                PART.push(elements.Heading_4(`${indexSubParts+1}.${indexItems+1}.${indexSubItems+1} ${subItems.title}`))
                PART.push(...addContentById(subItems.contentId))
            });
        }

        function createItems(subParts,indexSubParts) {
            
            if (subParts.items)
            subParts.items.forEach((items,indexItems) => {
                if (items.breakPageBefore) PART.push(elements.BreakPage())
                PART.push(elements.Heading_3(`${indexSubParts+1}.${indexItems+1} ${items.title}`))
                if (items.contentId) {
                    PART.push(...addContentById(items.contentId))
                    createSubItems(items,indexItems,indexSubParts)
                }
            });

        }

        function createHeader() {
            if (part.subParts) {
                part.subParts.forEach((subParts,indexSubParts) => {
                    if (subParts.breakPageBefore) PART.push(elements.BreakPage())
                    PART.push(elements.Heading_2(`${indexSubParts+1} ${subParts.title}`))
                    if (subParts.contentId) {
                        PART.push(...addContentById(subParts.contentId))
                        createItems(subParts,indexSubParts)
                    }
                    if (introCover) createSectionFirst(part,indexPart,subParts.titleCover?subParts.titleCover:false)
        
                });
            }
        }
        function createSectionFirst(part,indexPart,titleCover) {            
            var INTRO_COVER = [];
            if (part.contentId && docInfo.content[`${part.contentId}`] && titleCover) {
                docInfo.content[`${part.contentId}`].forEach(content => {
                    if (content.show === true) {
                        if (content.type == 'introCover') {
                            INTRO_COVER.push(...elements.CoverOfChapterTwo(docInfo.document.title,`PARTE 0${indexPart+1} – ${content.contentParagraph}`,titleCover))
                        }
                    }
                });
            } else if (titleCover) {INTRO_COVER.push(...elements.CoverOfChapterTwo(docInfo.document.title,`PARTE 0${indexPart+1} – ${part.type}`,titleCover))}
    
            if (INTRO_COVER.length>0) doc.addSection({
                footers: {
                    default: new Footer({
                children: [new Paragraph({children: [new TextRun({text: docInfo.document.date,size:27, bold:true,}), ],alignment: AlignmentType.CENTER,}),new Paragraph({ children: [new TextRun({text: docInfo.document.rev,size:27,bold:true, })], alignment: AlignmentType.CENTER, }),],
                    }),
                    margins:{bottom:500}
                },
                children: [...INTRO_COVER]
            });
    
            doc.addSection({
                footers: {
                    default: new Footer({
                        children: [elements.TableFooter(elements.ImageGenerate(docInfo.images.logoFooter,40,40,doc),docInfo.document.titleAll,titleCover,docInfo.document.date,docInfo.document.rev)],
                    }),
                },
                headers: {
                    default: new Header({
                        children: [elements.TableHeader(elements.ImageGenerate(docInfo.images.logoHeader,0,0,doc))],
                    }),
                },
                properties: indexPart === 0 ? {...numPageInit} : {...numPage},
                margins: {
                    marginUnitType: WidthType.DXA,
                    right: 1000,
                },
                children: [...PART],
            }); 
            PART = []
        }

        createHeader()

        return PART

    }

    if (docInfo.parts)
    docInfo.parts.forEach((part,indexPart) => {

        if (part.type && part.type == 'IntroCover') {
            createSubParts(part,indexPart,true)
        } else {
            var INTRO_COVER = [];
    
            if (part.contentId && docInfo.content[`${part.contentId}`] && docInfo.content[`${part.contentId}`].length>0) {
                docInfo.content[`${part.contentId}`].forEach(paragraph => {
                    if (paragraph.show === true) {
                        if (paragraph.type == 'introCover') {
                            if (paragraph.contentParagraph.length==1) {
                                INTRO_COVER.push(...elements.CoverOfChapterOne(docInfo.document.title,`PARTE 0${indexPart+1} – ${paragraph.contentParagraph[0]}`))
                            } else if (paragraph.contentParagraph.length==2) {
                                INTRO_COVER.push(...elements.CoverOfChapterTwo(docInfo.document.title,`PARTE 0${indexPart+1} – ${paragraph.contentParagraph[0]}`,paragraph.contentParagraph[1]))
                            }
                        }
                    }
                });
            } 
    
            if (INTRO_COVER.length>0) doc.addSection({
                footers: {
                    default: new Footer({
                children: [new Paragraph({children: [new TextRun({text: docInfo.document.date,size:27, bold:true,}), ],alignment: AlignmentType.CENTER,}),new Paragraph({ children: [new TextRun({text: docInfo.document.rev,size:27,bold:true, })], alignment: AlignmentType.CENTER, }),],
                    }),
                    margins:{bottom:500}
                },
                children: [...INTRO_COVER]
            });
    
            doc.addSection({
                footers: {
                    default: new Footer({
                        children: [elements.TableFooter(elements.ImageGenerate(docInfo.images.logoFooter,40,40,doc),docInfo.document.titleAll,part.title,docInfo.document.date,docInfo.document.rev)],
                    }),
                },
                headers: {
                    default: new Header({
                        children: [elements.TableHeader(elements.ImageGenerate(docInfo.images.logoHeader,0,0,doc))],
                    }),
                },
                properties: indexPart === 0 ? {...numPageInit} : {...numPage},
                margins: {
                    marginUnitType: WidthType.DXA,
                    right: 1000,
                },
                children: [...createSubParts(part,indexPart)],
            }); 
        }

    });
}