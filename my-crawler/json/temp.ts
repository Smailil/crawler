const newStatic_root = {
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
            "type": "FromHTMLExtractor",
            "subType": "text",
            "html": "S:content",
            "selector": ".text-primary",
            "name": "S:price",
            "multiply": false,
            "textManipulation": {
                "trim": true,
                "prefix": "₽ "
            }
        },
        {
            "id": "10",
            "type": "FromHTMLExtractor",
            "subType": "url",
            "html": "S:content",
            "selector": "h5 > a",
            "name": "S:url",
            "multiply": false,
            "textManipulation": {
                "trim": true
            }
        },
        {
            "id": "11",
            "type": "branchCondition",
            "firstOperand": "S:price",
            "logicalOperation": ">=",
            "secondOperand": "500",
            "ifProgram": ["12", "13"],
            "elseProgram": ["12", "14"]
        },
        {
            "id": "12",
            "type": "goto",
            "link": "S:url"
        },
        {
            "id": "13",
            "type": "include",
            "label": "newStatic_scrapemap_moreOrEq500"
        },
        {
            "id": "14",
            "type": "include",
            "label": "newStatic_scrapemap_less500"
        }
    ]
}

const newStatic_scrapemap_less500 = {
    "_id": "newStatic_scrapemap_less500",
    "beginProgram": ["1", "2"],
    "selectors": [
        {
            "id": "1",
            "type": "extractor",
            "subType": "text",
            "selector": ".card-title",
            "name": "S:title",
            "multiple": false,
            "textManipulation": {
            }
        },
        {
            "id": "2",
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

const newStatic_scrapemap_moreOrEq500 = {
    "_id": "newStatic_scrapemap_moreOrEq500",
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