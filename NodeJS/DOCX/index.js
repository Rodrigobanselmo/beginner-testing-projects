const { File, Footer, PageBreak,ShadingType,Table,TextWrappingType,TextWrappingSide,Header, PageNumber, PageNumberFormat, PageOrientation,AlignmentType,WidthType,Media,TableRow,TableCell,BorderStyle, HeadingLevel,TextRun, Packer, Paragraph, StyleLevel, TableOfContents, VerticalAlign } = require("docx");
const elements = require("./func/elements.js")
const createElements = require("./func/createElements")
const fs = require("fs");
const doc = new File({
    styles: {
        paragraphStyles: [
            {
                id: "MySpectacularStyle",
                name: "Heading 1",
                basedOn: "Heading1",
                next: "Heading1",
                quickFormat: true,
                run: {
                    allCaps: true,
                    color: "000000",
                    size:25,
                    bold: true
                },
            },
            {
                id: "MySpectacularStyle",
                name: "Heading 2",
                basedOn: "Heading2",
                next: "Heading2",
                quickFormat: true,
                run: {
                    allCaps: true,
                    color: "000000",
                    size:22,
                    bold: true
                },
            },
            {
                id: "MySpectacularStyle",
                name: "Heading 3",
                basedOn: "Heading3",
                next: "Heading3",
                quickFormat: true,
                run: {
                    color: "000000",
                    size:22,
                    bold: true
                },
            },
            {
                id: "MySpectacularStyle",
                name: "Heading 4",
                basedOn: "Heading4",
                next: "Heading4",
                quickFormat: true,
                run: {
                    color: "000000",
                    size:22,
                    bold: true
                },
            },
            {
                id: "MySpectacularStyle",
                name: "Heading 5",
                basedOn: "Heading5",
                next: "Heading5",
                quickFormat: true,
                run: {
                    color: "000000",
                    size:21,
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120
                    },
                },
            },
            {
                id: "MySpectacularStyle",
                name: "Heading 6",
                basedOn: "Heading6",
                next: "Heading6",
                quickFormat: true,
                run: {
                    color: "000000",
                    size:21,
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120
                    },
                },
            },
        ],
    },
});

const bordersTop = {
    top: {style: BorderStyle.DOUBLE,size: 3,color: "000000",}, 
    bottom: {style: BorderStyle.SINGLE,size: 30,color: "ffffff",},
    left: { style: BorderStyle.SINGLE,size: 3,color: "ffffff",},
    right: {style: BorderStyle.SINGLE,size: 3,color: "ffffff",},
}
const bordersInside = {
    top: {style: BorderStyle.SINGLE,size: 3,color: "ffffff",}, 
    bottom: {style: BorderStyle.SINGLE,size: 3,color: "ffffff",},
    left: { style: BorderStyle.SINGLE,size: 3,color: "ffffff",},
    right: {style: BorderStyle.SINGLE,size: 3,color: "ffffff",},
}
const bordersBottom = {
    top: {style: BorderStyle.SINGLE,size: 30,color: "ffffff",}, 
    bottom: {style: BorderStyle.SINGLE,size: 3,color: "000000",},
    left: { style: BorderStyle.INSET,size: 3,color: "000000",},
    right: {style: BorderStyle.INSET,size: 3,color: "000000",},
}
const borders11_16 = {
    left:{ style: BorderStyle.SINGLE,size: 3,color: "000000"},right:{ style: BorderStyle.SINGLE,size: 30,color: "ffffff"}
}
const borders11 = {
    left: {style: BorderStyle.INSET,size: 3,color: "000000",},
}
const borders16 = {
    right: {style: BorderStyle.INSET,size: 3,color: "000000",},
}

const dataTable = {
    
}


    var document = {
        titleAll: "PCMSO ??? PROGRAMA DE GERENCIAMENTO DE RISCOS",
        title: 'PROGRAMA DE GERENCIAMENTO DE RISCOS',
        date: 'Fevereiro de 2021',
        rev: 'REV. 00',
    }

    var professionals = [
        {
            id:'1',
            name:'Alex Abreu Marins',
            office:['Engenheiro de Seguran??a do Trabalho','Engenheiro Ambiental','Higienista Ocupacional'],
            CREA:'BA 54.947',
            department: [],
            certifications: ['Higienista Ocupacional Certificado','ABHO Membro 1113','Certificado HOC 0061'],
            company:'Realiza'
        },
        {
            id:'2',
            name:'Rodrigo Barbosa',
            office:['T??cnico de Seguran??a do Trabalho/Higiene Ocupacional'],
            CREA:false,
            certifications: [],
            company:'Realiza Solu????es em Medicina e Seguran??a do Trabalho S/S Ltda.'
        },
        {
            id:'3',
            name:'NOME DO COORDENADOR DO PGR',
            office:['CARGO DO COORDENADOR DO PGR'],
            CREA:false,
            department: ['NOME DO SETOR/DEPARTAMENTO DO COORDENADOR DO PGR'],
            certifications: [],
            company:'NOME DA EMPRESA CONTRATANTE'
        },
        {
            id:'4',
            name:'NOME DO PRESIDENTE DA CIPA ou DESIGNADO',
            office:['CARGO DO PRESIDENTE DA CIPA ou DESIGNADO'],
            CREA:false,
            certifications: [],
            company:'NOME DA EMPRESA CONTRATANTE'
        },
    ]

    var responsible = [        
        {company:'Realiza', employees:['1','2']},
        {company:'EMPRESA CONTRATANTE', employees:['3','4']},
    ]

    var company = {
        name:'Realiza',
        address:'XXXX',
        CEP:'12.246-000',
        phone:'(12) 996818163',
        activityBranch:{principal:'Software Development',secondary:'Chemical Engineering, Student'},
        CNAE:{principal:'XXXXX',secondary:'XXXXXX, XXXXXX'},
        riskDegree:'3',
        employersResponsible:'Alex Marins',
        occupation:'Development of SSP Software',
        CNPJ:'00.000.000/0001-00',
        employeesTotal:'2',
        workTime:{
            SECTOR_1:'Segunda ?? Sexta-feira das 07 h ??s 17 h',
            SECTOR_2:'Segunda ?? Sexta-feira das 07 h ??s 17 h //S??bado das 07 h ??s 11 h (conforme escala)',
            SECTOR_3:'Segunda ?? Sexta-feira das 07 h ??s 17 h // 12 h ??s 23 h.'
        },
        sector:[{name:'XXXX',applied:true},{name:'YYYY',applied:true},{name:'ZZZZ',applied:false}],
        activities:[{name:'XXXX',applied:true},{name:'YYYY',applied:true},{name:'ZZZZ',applied:false}]
    }
    
    var images={
        logoFooter:'./assets/logo.png',
        coverBackgroundImage:"./assets/backgroundImage.png",
        logoHeader:"./assets/logo.png",
    }
    
    var tables = {
        idt01: {
            name:'Controle das Revis??es do Documento',
            rows:6,
            columns:6,
            sizes:[15,30,100,90,90,90],
            name:'Controle das Revis??es do Documento',
            childParagraphs:{
                p2_3t:{alignment:AlignmentType.LEFT},
                p6_6te:'p2_3t',
            },
            childCells:{
                p1_1a:{shading: {val: ShadingType.SOLID,color: "000000"},borders:bordersTop},
                p1_6ae:'p1_1a',
                p1_1b:{shading: {val: ShadingType.SOLID,color: "000000"},borders:{...bordersInside,...borders11_16}},
                p6_1be:'p1_1b',
                p2_2c:{shading: {val: ShadingType.SOLID,color: "d2d2d2"},borders:bordersInside},
                p5_6ce:'p2_2c',
                p1_1i:{borders:{...bordersTop,...borders11}},
                p1_6i:{borders:{...bordersTop,...borders16}},
                p6_1i:{columnSpan: 6,borders:bordersBottom}
            },
            position:{
                p1_1:[[{text:`N??`,style:{}}]],
                p1_2:[[{text:`data`,style:{}}]],
                p1_3:[[{text:`Hist??rico das Altera????es`,style:{}}]],
                p1_4:[[{text:`Revisado por:`,style:{}}]],
                p1_5:[[{text:`Aprovado por:`,style:{}}]],
                p1_6:[[{text:`Assinaturas:`,style:{}}]],
                p2_1:[[{text:`0`,style:{}}]],
                p2_2:[[{text:`31/12/99`,style:{}}]],
                p2_3:[[{text:`Emiss??o do Documento Revisado`,style:{}}]],
                p2_4:[[{text:`Alex Abreu Marins`,style:{}}]],
                p2_5:[[{text:`(Nome do Respons??vel da Empresa)`,style:{}}]],
                p6_1:[[{text:`VIG??NCIA: Mar??o/2021 a Fevereiro/2023`,style:{size:16,bold:true}}]],
            }
        }

    }
    
    var figures = {
        
    }

    var parts = [
        {
            title:'DOCUMENTO BASE DO PGR',
            contentId:'id01',
            subParts:[
                {
                    title:'INTRODU????O',
                    contentId:'id1',
                    items:[
                        {
                            title:'Objetivo (NR-22 Item 22.1.1)',
                            contentId:'id11',
                            subItems:[]
                        },
                        {
                            title:'Identifica????o da Empresa',
                            contentId:'id12',
                            subItems:[]
                        },
                        {
                            title:'Abrang??ncia',
                            contentId:'id13',
                            subItems:[]
                        },
                        {
                            title:'Respons??veis pela Elabora????o desta Revis??o do PGR',
                            contentId:'id14',
                            subItems:[],
                            breakPageBefore:true
                        },
                        {
                            title:'Revis??es do Documento',
                            contentId:'id15',
                            subItems:[
/*                                 {
                                    title:'Testo Simples',
                                    contentId:'id151',
                                }, */
                            ]
                        },
                    ]
                }
            ]
        },
        {
            title:'PGR ??? DESENVOLVIMENTO (NR-22 Item 22.3.7 al??neas a)',
            type: 'IntroCover',
            contentId:'id02',
            subParts:[
                {
                    title:'CARACTERIZA????O DO AMBIENTE DE TRABALHO (NR-22 Item 22.6 al??neas a)',
                    titleCover:'CARACTERIZA????O DO AMBIENTE DE TRABALHO',
                    contentId:'idx',
                    items:[]
                },
                {
                    title:'CARACTERIZA????O DA M??O DE OBRA',
                    contentId:'idx',
                    items:[]
                },
                {
                    title:'CARACTERIZA????O DOS FATORES DE RISCO OCUPACIONAL (NR-22 item 22.3.7.1 al??nea a)',
                    titleCover:'CARACTERIZA????O DOS FATORES DE RISCO OCUPACIONAL',
                    contentId:'idx',
                    items:[]
                },
                {
                    title:'DEFINI????O DOS GRUPOS SIMILARES DE EXPOSI????O (GSE)',
                    titleCover:'DEFINI????O DOS GRUPOS SIMILARES DE EXPOSI????O (GSE)',
                    contentId:'idx',
                    items:[]
                },
                {
                    title:'AVALIA????O QUALITATIVA DOS RISCOS',
                    titleCover:'AVALIA????O QUALITATIVA DOS RISCOS',
                    contentId:'idx',
                    items:[]
                },
            ]
        }
    ]

    var content = {
        id01:[
            {
                type:'introCover',
                show:true,
                contentParagraph:[
                        `DOCUMENTO BASE DO PGR.`
                    ]
            },
            
        ],
        id1:[
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`O Documento Base do PGR tem como finalidade sintetizar todos os aspectos estruturais do programa e definir as diretrizes relativas ao gerenciamento dos riscos ambientais, que possam afetar a sa??de e a integridade f??sica dos trabalhadores da ${company.name} e de suas Contratadas`,style:{},special:null},
                        {text:` (NR-01 Item 1.5.1).`,style:{bold:true}}
                    ]
            },
            
        ],
        id11:[
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`O PROGRAMA DE GERENCIAMENTO DE RISCO ??? PGR visa disciplinar os preceitos a serem observados na organiza????o e no ambiente de trabalho, de forma a tornar compat??vel o planejamento e o desenvolvimento da atividade da empresa com a busca permanente da seguran??a e sa??de dos trabalhadores em conson??ncia com a NR-01 Subitem 1.5 Gerenciamento de Riscos Ocupacionais (GRO) em cumprimento ao determinado no`,style:{}},
                        {text:` subitem 1.5.3.1.1`,style:{bold:true}},
                        {text:` que institui o PGR como ferramenta de Gerenciamento de Riscos Ocupacionais.`,style:{}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`O PROGRAMA DE GERENCIAMENTO DE RISCO ??? PGR deve contemplar:`,style:{}},
                    ]
            },
            {
                type:'bullet',
                show:true,
                contentParagraph:[
                        [{text:`Provid??ncias quanto ?? elimina????o ou minimiza????o na maior extens??o poss??vel dos riscos ambientais;`,style:{},show:true}],
                        [{text:`Inspe????es peri??dicas para identificar, avaliar e controlar os riscos ?? sa??de e seguran??a;`,style:{},show:true}],
                        [{text:`Treinamento para todos os empregados e contratados em boas pr??ticas de sa??de, seguran??a e preserva????o ambiental;`,style:{},show:true}],
                        [{text:`Desenvolvimento de normas e procedimentos de sa??de e seguran??a e a exig??ncia de que os colaboradores cooperem no cumprimento das mesmas;`,style:{},show:true}],
                        [{text:`Investiga????o imediata e completa de todo acidente ou doen??a ocupacional para encontrar a causa e corrigir o problema de forma a evitar a reincid??ncia;`,style:{},show:true}],
                        [{text:`Participa????o dos colaboradores no reconhecimento dos riscos e proposi????o de medidas preventivas;`,style:{},show:true}],
                        [{text:`ATMOSFERAS EXPLOSIVA ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`DEFICI??NCIA DE OXIG??NIO ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`VENTILA????O ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`PROGRAMA DE PROTE????O RESPIRAT??RIA ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`INVESTIGA????O E AN??LISE DE ACIDENTES DO TRABALHO ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`ERGONOMIA E ORGANIZA????O DO TRABALHO ??? NR 17 ??? Quando Aplic??vel (NR-01 Item 1.5.3.2.1);`,style:{},show:true}],
                        [{text:`RISCOS DECORRENTES DO TRABALHO EM ALTURA ??? NR 35 ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`RISCOS DECORRENTES DO TRABALHO EM PROFUNDIDADE E EM ESPA??OS CONFINADOS NR 33 ??? Quando Aplic??vel; (NR-22 Item`,style:{},show:true}],
                        [{text:`RISCOS DECORRENTES DA UTILIZA????O DE ENERGIA EL??TRICA NR 10 ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`RISCOS DECORRENTES DE M??QUINAS E EQUIPAMENTOS (NR-12)??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`RISCOS DECORRENTES DE VE??CULOS ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`EPI???s (NR-06)`,style:{},show:true}],
                        [{text:`ESTABILIDADE DO MACI??O (NR-22) ??? Quando Aplic??vel; (NR-22 Item 22.3.7 al??neas l);`,style:{},show:true}],
                        [{text:`PLANO DE ATENDIMENTO E RESPOSTA A EMERG??NCIAS (NR-01 Item 1.5.6.);`,style:{},show:true}],
                        [{text:`SINALIZA????O DE ??REA DE TRABALHO E DE CIRCULA????O ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`PLANO DE TR??NSITO ??? Quando Aplic??vel;`,style:{},show:true}],
                        [{text:`GEST??O DE MUDAN??AS;`,style:{},show:true}],
                        [{text:`INFORMAC??A??O, QUALIFICAC??A??O E TREINAMENTO (NR-01 Item 1.4.4).`,style:{},show:true}],
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:``,style:{}},
                    ]
            },
        ],
        id12:[
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Raz??o Social:`,style:{bold:true}},
                        {text:` ${company.name}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Endere??o:`,style:{bold:true}},
                        {text:` ${company.address}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`CEP:`,style:{bold:true}},
                        {text:` ${company.CEP}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Fone:`,style:{bold:true}},
                        {text:` ${company.phone}`,style:{}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`Ramo de Atividade:`,style:{bold:true}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`\tPrincipal:`,style:{bold:true}},
                        {text:` ${company.activityBranch.principal}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`\tSecund??rias:`,style:{bold:true}},
                        {text:` ${company.activityBranch.secondary}`,style:{}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`CNAE:`,style:{bold:true}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`\tPrincipal:`,style:{bold:true}},
                        {text:` ${company.CNAE.principal}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`\tSecund??rias:`,style:{bold:true}},
                        {text:` ${company.CNAE.secondary}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Grau de Risco:`,style:{bold:true}},
                        {text:` ${company.riskDegree}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Respons??vel do Empregador:`,style:{bold:true}},
                        {text:` ${company.employersResponsible}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Fun????o:`,style:{bold:true}},
                        {text:` ${company.occupation}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`CNPJ:`,style:{bold:true}},
                        {text:` ${company.CNPJ}`,style:{}},
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:`Total de Empregados (CAGED):`,style:{bold:true}},
                        {text:` ${company.employeesTotal}`,style:{}},
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`Hor??rio de Trabalho:`,style:{}},
                    ]
            },
            {
                type:'bullet',
                show:true,
                contentParagraph:[
                        [{text:`${Object.keys(company.workTime)[0]}:`,style:{bold:true}},{text:`${company.workTime[`${Object.keys(company.workTime)[0]}`]}`,style:{},show:true}],
                        [{text:`${Object.keys(company.workTime)[1]}:`,style:{bold:true}},{text:`${company.workTime[`${Object.keys(company.workTime)[1]}`]}`,style:{},show:true}],
                        [{text:`${Object.keys(company.workTime)[02]}:`,style:{bold:true}},{text:`${company.workTime[`${Object.keys(company.workTime)[2]}`]}`,style:{},show:true}],
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:``,style:{}},
                    ]
            },
        ],
        id13:[
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`A crit??rio da organiza????o, o PGR pode ser implementado por unidade operacional, setor ou atividade.`,style:{},special:null},
                        {text:` (NR-01 Item 1.5.3.1.1.1).`,style:{bold:true}}
                    ]
            },
            {
                type:'paragraph',
                show:true,
                contentParagraph:[
                        {text:`Este PGR compreende toda unidade inscrita no`,style:{},special:null},
                        {text:` CNPJ:`,style:{bold:true}},
                        {text:`${company.CNPJ}`,style:{},special:null},
                    ]
            },
            {
                type:'paragraph',
                show:false,
                contentParagraph:[
                        {text:`Este PGR compreende as atividades realizadas no setor(es) ${company.sector[0].name}`,style:{},special:null},
                    ]
            },
            {
                type:'paragraph',
                show:false,
                contentParagraph:[
                        {text:`Este PGR compreende as atividades abaixo listadas:`,style:{},special:null},
                    ]
            },
            {
                type:'bullet',
                show:false,
                contentParagraph:[
                        [{text:`${company.activities[0].name}`,style:{},show:true}],
                        [{text:`${company.activities[1].name}`,style:{},show:true}],
                        [{text:`${company.activities[2].name}`,style:{},show:false}],
                    ]
            },
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:``,style:{}},
                    ]
            },
            
        ],
        id14:[
            {
                type:'paragraphSpacing',
                show:true,
                contentParagraph:[
                        {text:``,style:{}},
                    ]
            },
            {
                type:'arrayResponsible',
                show:true,
                contentParagraph:{responsible,professionals}
            },
        ],
        id15:[
            {
                type:'table',
                show:true,
                data:'idt01'
            },
        ],
        id02:[
            {
                type:'introCover',
                show:true,
                contentParagraph:`PGR ??? DESENVOLVIMENTO`,
            },
        ],
    }



const docInfo = {
    document,
    company,
    images,
    tables,
    figures,
    parts,
    content
}


//test
/* doc.addSection({
    children: [
        new Paragraph({
            text: "Bullet points",
            bullet: {
                level: 0, //How deep you want the bullet to be
            },
        }),
        elements.Table(dataTable)
    ],            margins: {
        marginUnitType: WidthType.DXA,
        right: 1000,
    },
}); */

//Cap
doc.addSection({
    headers: {
        default: new Header({
            children: [new Paragraph(elements.ImageBackground(docInfo.images.coverBackgroundImage,doc))],
        }),
    },
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    text: 'PROGRAMA DE',
                    size:56,
                    bold:true,
                    color:'ffffff'
                }),
            ],
            spacing: {
                after: 130,
            },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'GERENCIAMENTO DE',
                    size:56,
                    bold:true,
                    color:'ffffff'
                }),
            ],
            spacing: {
                after: 130,
            },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'RISCOS',
                    size:56,
                    bold:true,
                    color:'ffffff'
                }),
            ],
            spacing: {
                after: 130,
            },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'PGR',
                    size:56,
                    bold:true,
                    color:'ffffff'
                }),
            ],
            spacing: {
                after: 130,
            },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'Fevereiro 2021 ??? Rev 00',
                    size:26,
                    color:'ffffff'
                }),
            ],
            spacing: {
                after: 130,
            },
        }),
    ],
    margins: {
        top: 5000,
    },
});

//table of contents dow here
doc.addSection({
    children: [
        ...elements.Summary("Sum??rio",1),
        elements.TableContents("Summary",1),
    ],
});
if (Object.keys(docInfo.tables).length > 0)
doc.addSection({
    margins: {
        left: 550,
   },
    children: [
        ...elements.Summary("??ndice de Tabelas",2),
        elements.TableContents("Tables",2),
    ],
});
if (Object.keys(docInfo.figures).length > 0)
doc.addSection({
    margins: {
        left: 450,
   },
    children: [
        ...elements.Summary("??ndice de Figuras",3),
        elements.TableContents("Figures",3),
    ],
});


/* doc.addSection({
    children: [...elements.CoverOfChapterOne(docInfo.document.title,docInfo.parts[0].title,docInfo.document.date,docInfo.document.rev)],
}); */



createElements(doc,docInfo)

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});



// npm install node-fetch
//const fetch = require('node-fetch');
/* async function w() {
    const response = await fetch('https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg');
    const buffer = await response.buffer();
    return name(buffer)
} */




