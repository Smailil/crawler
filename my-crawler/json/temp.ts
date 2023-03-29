const json = {
    "_id": "newStatic_root",
    "startUrls": ["https://demo-site.at.ispras.ru/static"],
    "beginProgram": ["1", "2"],
    "selectors": [
        {
            "id": "1",
            "type": "extractor",
            "subType": "url",
            "selector": "ul.nav ul a.nav-link",
            "name": "S:categories",
            "multiple": true,
            "textManipulation": {
            }
        },
        {
            "id": "2",
            "type": "foreach",
            "array": "S:categories",
            "name": "S:category",
            "program": ["3", "4", "5"]
        },
        {
            "id": "3",
            "type": "goto",
            "link": "S:category"
        },
        {
            "id": "4",
            "type": "extractor",
            "subType": "url",
            "selector": "a.page-link",
            "name": "S:pages",
            "multiple": true,
            "textManipulation": {
            }
        },
        {
            "id": "5",
            "type": "foreach",
            "array": "S:pages",
            "name": "S:page",
            "program": ["6", "7", "8"]
        },
        {
            "id": "6",
            "type": "goto",
            "link": "S:page"
        },
        {
            "id": "7",
            "type": "extractor",
            "subType": "html",
            "selector": "div.card-body",
            "name": "S:contents",
            "multiple": true,
            "textManipulation": {
            }
        },
        {
            "id": "8",
            "type": "foreach",
            "array": "S:contents",
            "name": "S:content",
            "program": ["9", "10", "11"]
        },
        {
            "id": "9",
            "type": "fromHTMLExtractor",
            "subType": "text",
            "html": "S:content",
            "selector": ".text-primary",
            "name": "S:price",
            "multiply": false,
            "textManipulation": {
                "trim": true,
                "replaceText": "₽ ",
                "replacementText": ""
            }
        },
        {
            "id": "10",
            "type": "fromHTMLExtractor",
            "subType": "url",
            "html": "S:content",
            "selector": "h5 > a",
            "name": "S:url",
            "multiply": false,
            "textManipulation": {
                "trim": true,
                "textPrefix": "https://demo-site.at.ispras.ru"
            }
        },
        {
            "id": "11",
            "type": "branchCondition",
            "firstOperand": "S:price",
            "logicalOperation": ">=",
            "secondOperand": "500",
            "ifProgram": ["12", "13"],
            "elseProgram": ["12", "14"],
            "typeOfOperand": "float"
        },
        {
            "id": "12",
            "type": "goto",
            "link": "S:url"
        },
        {
            "id": "13",
            "type": "include",
            "label": "newStatic_scrapemap"
        },
        {
            "id": "14",
            "type": "include",
            "label": "newStatic_scrapemap_less500"
        }
    ]
};

const json2 = {
    "_id": "newStatic_scrapemap",
    "beginProgram": ["1", "2", "3", "4"],
    "selectors": [
        {
            "id": "1",
            "type": "extractor",
            "subType": "image",
            "selector": "img",
            "name": "S:img",
            "multiple": false,
            "textManipulation": {
            }
        },
        {
            "id": "2",
            "type": "extractor",
            "subType": "text",
            "selector": ".card-title",
            "name": "S:title",
            "multiple": false,
            "textManipulation": {
            }
        },
        {
            "id": "3",
            "type": "extractor",
            "subType": "text",
            "selector": ".card-text",
            "name": "S:text",
            "multiple": false,
            "textManipulation": {
            }
        },
        {
            "id": "4",
            "type": "extractor",
            "subType": "text",
            "selector": ".text-primary",
            "name": "S:price",
            "multiple": false,
            "textManipulation": {
            }
        }
    ]
}

const json3 = {
    "_id": "liberte_root",
    "startUrls": ["https://www.liberte-algerie.com/actualite"],
    "beginProgram": ["1"],
    "selectors": [
        {
            "id": "1",
            "type": "loopOnExists",
            "numberOfLoops": "10",
            "selector": "ul.list-main li.link-btn a",
            "loopProgram": ["2", "3"],
            "afterLoopProgram": ["4", "5"]
        },
        {
            "id": "2",
            "type": "click",
            "selector": "ul.list-main li.link-btn a"
        },
        {
            "id": "3",
            "type": "timeout",
            "time": "5000"
        },
        {
            "id": "4",
            "type": "extractor",
            "subType": "url",
            "selector": "#categoryArticles > ul h3 > a",
            "name": "S:urls",
            "multiple": true,
            "textManipulation": {}
        },
        {
            "id": "5",
            "type": "foreach",
            "array": "S:urls",
            "name": "S:url",
            "program": ["6", "7"]
        },
        {
            "id": "6",
            "type": "goto",
            "link": "S:url"
        },
        {
            "id": "7",
            "type": "include",
            "label": "liberte_scrapemap"
        }
    ]
}

const json4 = {
    "_id": "liberte_scrapemap",
    "beginProgram": ["1", "2", "3", "4", "5"],
    "selectors": [
        {
            "id": "1",
            "type": "extractor",
            "subType": "text",
            "selector": "h1",
            "name": "S:title",
            "multiple": false,
            "textManipulation": {}
        },
        {
            "id": "2",
            "type": "extractor",
            "subType": "image",
            "selector": "figure.image-article img.blur",
            "name": "S:img",
            "multiple": false,
            "textManipulation": {}
        },
        {
            "id": "3",
            "type": "extractor",
            "subType": "text",
            "selector": "div.module-offset p",
            "name": "S:text",
            "multiple": true,
            "textManipulation": {}
        },
        {
            "id": "4",
            "type": "extractor",
            "subType": "text",
            "selector": "footer div.module-users a",
            "name": "S:authors",
            "multiple": true,
            "textManipulation": {}
        },
        {
            "id": "5",
            "type": "extractor",
            "subType": "text",
            "selector": "footer div.module-users span",
            "name": "S:date",
            "multiple": false,
            "textManipulation": {
                "trim": true,
                "replaceText": "Publié ",
                "replacementText": ""
            }
        }
    ]
}