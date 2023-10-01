const comics = {
    "jagerlied": {
        "title": "Jägerlied",
        "hasZeroChapter": true,
        "overview": "Un cazador, una mujer, y un relato imposible.",
        "chapters": [
            {
                "subtitle": "Obertura",
                "date": "2020-12-23",
                "pageCount": 16
            },
            {
                "subtitle": "Canto I",
                "date": "2023-09-23",
                "pageCount": 20
            }
        ]
    },
    "querida_olivia": {
        "title": "Querida Olivia",
        "overview": "Una historia de amor, monstruos y sacrificios.",
        "chapters": [
            {
                "date": "2020-04-26",
                "pageCount": 20
            }
        ]
    },
    "setenta_y_siete": {
        "title": "Setenta y Siete",
        "overview": "Una historia corta sobre viajes en el tiempo. Presentada en el concurso Crack Bang Boom 2019.",
        "chapters": [
            {
                "date": "2019-11-05",
                "pageCount": 8
            }
        ]
    },
    "offices_and_managers": {
        "title": "Offices And Managers",
        "overview": "Cinco aventureros en una situación imposible.",
        "chapters": [
            {
                "subtitle": "Fallo Crítico",
                "date": "2018-12-19",
                "pageCount": 12
            }
        ]
    },
};

export default function getAllComics() {
    return comics;
}

