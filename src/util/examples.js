const EXAMPLES = {
  shacl: [
    [
      {
        "@id": "_:b0",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#address"
          }
        ],
        "http://www.w3.org/ns/shacl#class": [
          {
            "@id": "http://example.org/ns#PostalAddress"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#ClassExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b0"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b1",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#age"
          }
        ],
        "http://www.w3.org/ns/shacl#datatype": [
          {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#DatatypeExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b1"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ]
      }
    ],
    [
      {
        "@id": "http://example.org/ns#NodeKindExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#nodeKind": [
          {
            "@id": "http://www.w3.org/ns/shacl#IRI"
          }
        ],
        "http://www.w3.org/ns/shacl#targetObjectsOf": [
          {
            "@id": "http://example.org/ns#knows"
          }
        ]
      }
    ],
    [
      {
        "@id": "http://example.org/ns#MinCountExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#PropertyShape"],
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#name"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b2",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#birthDate"
          }
        ],
        "http://www.w3.org/ns/shacl#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxCountExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b2"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b3",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://www.w3.org/ns/shacl#minExclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinExclusiveExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b3"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b4",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://www.w3.org/ns/shacl#minInclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinInclusiveExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b4"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b5",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://www.w3.org/ns/shacl#maxExclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxExclusiveExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b5"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b6",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://www.w3.org/ns/shacl#maxInclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxInclusiveExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b6"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b7",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#password"
          }
        ],
        "http://www.w3.org/ns/shacl#minLength": [
          {
            "@value": "8",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinLengthExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b7"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b8",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#password"
          }
        ],
        "http://www.w3.org/ns/shacl#maxLength": [
          {
            "@value": "10",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxLengthExampleShape",
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinLengthExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b8"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b9",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#bCode"
          }
        ],
        "http://www.w3.org/ns/shacl#pattern": [
          {
            "@value": "^B"
          }
        ],
        "http://www.w3.org/ns/shacl#flags": [
          {
            "@value": "i"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#PatternExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b9"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b10",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#prefLabel"
          }
        ],
        "http://www.w3.org/ns/shacl#languageIn": [
          {
            "@list": [
              {
                "@value": "en"
              },
              {
                "@value": "mi"
              }
            ]
          }
        ]
      },
      {
        "@id": "http://example.org/ns#NewZealandLanguagesShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b10"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Mountain"
          },
          {
            "@id": "http://example.org/ns#Berg"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b13",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#label"
          }
        ],
        "http://www.w3.org/ns/shacl#uniqueLang": [
          {
            "@value": "true",
            "@type": "http://www.w3.org/2001/XMLSchema#boolean"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#UniqueLangExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b13"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b14",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://www.w3.org/ns/shacl#equals": [
          {
            "@id": "http://example.org/ns#givenName"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#EqualExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b14"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b15",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#prefLabel"
          }
        ],
        "http://www.w3.org/ns/shacl#disjoint": [
          {
            "@id": "http://example.org/ns#altLabel"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#DisjointExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b15"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#USA"
          },
          {
            "@id": "http://example.org/ns#Germany"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b16",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#startDate"
          }
        ],
        "http://www.w3.org/ns/shacl#lessThan": [
          {
            "@id": "http://example.org/ns#endDate"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#LessThanExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b16"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Event1"
          },
          {
            "@id": "http://example.org/ns#Event2"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b17",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#startDate"
          }
        ],
        "http://www.w3.org/ns/shacl#lessThanOrEquals": [
          {
            "@id": "http://example.org/ns#endDate"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#LessThanOrEqualsExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b17"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Event1"
          },
          {
            "@id": "http://example.org/ns#Event2"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b18",
        "@type": ["http://www.w3.org/ns/shacl#PropertyShape"],
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#NotExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#not": [
          {
            "@id": "_:b18"
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#InvalidInstance1"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b19",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b22",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://www.w3.org/ns/shacl#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#ExampleAndShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#and": [
          {
            "@list": [
              {
                "@id": "http://example.org/ns#SuperShape"
              },
              {
                "@id": "_:b22"
              }
            ]
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#ValidInstance"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#SuperShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b19"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b24",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b26",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#givenName"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#OrConstraintExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#or": [
          {
            "@list": [
              {
                "@id": "_:b24"
              },
              {
                "@id": "_:b26"
              }
            ]
          }
        ],
        "http://www.w3.org/ns/shacl#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b28",
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b29"
          }
        ]
      },
      {
        "@id": "_:b29",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#fullName"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b31",
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b32"
          },
          {
            "@id": "_:b33"
          }
        ]
      },
      {
        "@id": "_:b32",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b33",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#lastName"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#XoneConstraintExampleShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#xone": [
          {
            "@list": [
              {
                "@id": "_:b28"
              },
              {
                "@id": "_:b31"
              }
            ]
          }
        ],
        "http://www.w3.org/ns/shacl#targetClass": [
          {
            "@id": "http://example.org/ns#Person"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b34",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#postalCode"
          }
        ],
        "http://www.w3.org/ns/shacl#datatype": [
          {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          }
        ],
        "http://www.w3.org/ns/shacl#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b35",
        "http://www.w3.org/ns/shacl#path": [
          {
            "@id": "http://example.org/ns#address"
          }
        ],
        "http://www.w3.org/ns/shacl#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ],
        "http://www.w3.org/ns/shacl#node": [
          {
            "@id": "http://example.org/ns#AddressShape"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#AddressShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b34"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#PersonShape",
        "@type": ["http://www.w3.org/ns/shacl#NodeShape"],
        "http://www.w3.org/ns/shacl#property": [
          {
            "@id": "_:b35"
          }
        ],
        "http://www.w3.org/ns/shacl#targetClass": [
          {
            "@id": "http://example.org/ns#Person"
          }
        ]
      }
    ]
  ],
  model: [
    [
      {
        "@id": "_:b0",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#address"
          }
        ],
        "http://2019.summerofcode.be/unshacled#class": [
          {
            "@id": "http://example.org/ns#PostalAddress"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#ClassExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b0"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b1",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#age"
          }
        ],
        "http://2019.summerofcode.be/unshacled#datatype": [
          {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#DatatypeExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b1"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ]
      }
    ],
    [
      {
        "@id": "http://example.org/ns#NodeKindExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#nodeKind": [
          {
            "@id": "http://2019.summerofcode.be/unshacled#IRI"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetObjectsOf": [
          {
            "@id": "http://example.org/ns#knows"
          }
        ]
      }
    ],
    [
      {
        "@id": "http://example.org/ns#MinCountExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#PropertyShape"],
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#name"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b2",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#birthDate"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxCountExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b2"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b3",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minExclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinExclusiveExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b3"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b4",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minInclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinInclusiveExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b4"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b5",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxExclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxExclusiveExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b5"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b6",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#hasKeys"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxInclusive": [
          {
            "@value": "2",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxInclusiveExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b6"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b7",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#password"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minLength": [
          {
            "@value": "8",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinLengthExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b7"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b8",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#password"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxLength": [
          {
            "@value": "10",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MaxLengthExampleShape",
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#MinLengthExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b8"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b9",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#bCode"
          }
        ],
        "http://2019.summerofcode.be/unshacled#pattern": [
          {
            "@value": "^B"
          }
        ],
        "http://2019.summerofcode.be/unshacled#flags": [
          {
            "@value": "i"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#PatternExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Carol"
          }
        ],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b9"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b10",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#prefLabel"
          }
        ],
        "http://2019.summerofcode.be/unshacled#languageIn": [
          {
            "@list": [
              {
                "@value": "en"
              },
              {
                "@value": "mi"
              }
            ]
          }
        ]
      },
      {
        "@id": "http://example.org/ns#NewZealandLanguagesShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b10"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Mountain"
          },
          {
            "@id": "http://example.org/ns#Berg"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b13",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#label"
          }
        ],
        "http://2019.summerofcode.be/unshacled#uniqueLang": [
          {
            "@value": "true",
            "@type": "http://www.w3.org/2001/XMLSchema#boolean"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#UniqueLangExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b13"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Alice"
          },
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b14",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#equals": [
          {
            "@id": "http://example.org/ns#givenName"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#EqualExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b14"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          },
          {
            "@id": "http://example.org/ns#Alice"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b15",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#prefLabel"
          }
        ],
        "http://2019.summerofcode.be/unshacled#disjoint": [
          {
            "@id": "http://example.org/ns#altLabel"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#DisjointExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b15"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#USA"
          },
          {
            "@id": "http://example.org/ns#Germany"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b16",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#startDate"
          }
        ],
        "http://2019.summerofcode.be/unshacled#lessThan": [
          {
            "@id": "http://example.org/ns#endDate"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#LessThanExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b16"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Event1"
          },
          {
            "@id": "http://example.org/ns#Event2"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b17",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#startDate"
          }
        ],
        "http://2019.summerofcode.be/unshacled#lessThanOrEquals": [
          {
            "@id": "http://example.org/ns#endDate"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#LessThanOrEqualsExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b17"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Event1"
          },
          {
            "@id": "http://example.org/ns#Event2"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b18",
        "@type": ["http://2019.summerofcode.be/unshacled#PropertyShape"],
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#NotExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#not": [
          {
            "@id": "_:b18"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#InvalidInstance1"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b19",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b22",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#property"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#ExampleAndShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#and": [
          {
            "@list": [
              {
                "@id": "http://example.org/ns#SuperShape"
              },
              {
                "@id": "_:b22"
              }
            ]
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#ValidInstance"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#SuperShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b19"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b24",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b26",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#givenName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#OrConstraintExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#or": [
          {
            "@list": [
              {
                "@id": "_:b24"
              },
              {
                "@id": "_:b26"
              }
            ]
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetNode": [
          {
            "@id": "http://example.org/ns#Bob"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b28",
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b29"
          }
        ]
      },
      {
        "@id": "_:b29",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#fullName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b31",
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b32"
          },
          {
            "@id": "_:b33"
          }
        ]
      },
      {
        "@id": "_:b32",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#firstName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b33",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#lastName"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#XoneConstraintExampleShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#xone": [
          {
            "@list": [
              {
                "@id": "_:b28"
              },
              {
                "@id": "_:b31"
              }
            ]
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetClass": [
          {
            "@id": "http://example.org/ns#Person"
          }
        ]
      }
    ],
    [
      {
        "@id": "_:b34",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#postalCode"
          }
        ],
        "http://2019.summerofcode.be/unshacled#datatype": [
          {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          }
        ],
        "http://2019.summerofcode.be/unshacled#maxCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ]
      },
      {
        "@id": "_:b35",
        "http://2019.summerofcode.be/unshacled#path": [
          {
            "@id": "http://example.org/ns#address"
          }
        ],
        "http://2019.summerofcode.be/unshacled#minCount": [
          {
            "@value": "1",
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          }
        ],
        "http://2019.summerofcode.be/unshacled#node": [
          {
            "@id": "http://example.org/ns#AddressShape"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#AddressShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b34"
          }
        ]
      },
      {
        "@id": "http://example.org/ns#PersonShape",
        "@type": ["http://2019.summerofcode.be/unshacled#NodeShape"],
        "http://2019.summerofcode.be/unshacled#property": [
          {
            "@id": "_:b35"
          }
        ],
        "http://2019.summerofcode.be/unshacled#targetClass": [
          {
            "@id": "http://example.org/ns#Person"
          }
        ]
      }
    ]
  ]
};

const lists = {};
const types = new Set();
const ids = new Set();
EXAMPLES.model.forEach(e =>
  e.forEach(array => {
    for (const property in array) {
      const value = array[property];
      if (typeof value === "object") {
        const innervalue = value[0];
        if (innervalue["@id"]) ids[property] = true;
        if (innervalue["@type"]) types[property] = true;
        if (innervalue["@list"]) lists[property] = true;
      }
    }
  })
);
export { EXAMPLES as default };
