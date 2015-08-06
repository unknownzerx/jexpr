var jexpr = mk_jexpr(true);
var jexpr2 =
    ['html',
        ['head',
            ['title', 'hello']
        ],
        ['body',
            ['p',
                {
                    id: 'some-p',
                    style: 'font-size: 12px;'
                },
                'world'],
            ['p', 'or hello word']]
    ];

var jexpr3 =
    ['ul', {
        id:'ul1',
        style:'color: red;'
    },
        ['li', '<script>alert("compromised");</script>'],
        ['li', 'blahblah'],
        ['script', 'alert("compromised")']
    ];

document.getElementsByTagName('body')[0].appendChild(jexpr.to_dom_node(jexpr3)[0]);

var data = [{
    id: 1,
    info: 'hello'
}, {
    id: 2,
    info: 'world'
}];

var make_ul = function(data) {
    return [
        'ul', {
            id:'ul1<script>alert("compromised");</script>',
            style:'color: red;',
            __custom_property: 123,
            '<script>alert("compromised");</script>': 666
        },
// to_dom_node will do splicing for us
        data.map(function(x) {
            return ['li', '' + x.id + ' ' + x.info];
        })
    ];
};

var node = jexpr.to_dom_node(make_ul(data))[0];
document.getElementsByTagName('body')[0].appendChild(node);
