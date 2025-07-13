// Questions d'examen par niveau
const examQuestions = {
    "ce2-cm1": [
        {
            id: 1,
            question: "Quelle est la règle d'accord du participe passé avec l'auxiliaire être ?",
            options: [
                "Il s'accorde toujours avec le sujet",
                "Il ne s'accorde jamais",
                "Il s'accorde avec le complément d'objet direct",
                "Il s'accorde selon le contexte"
            ],
            correct: 0
        },
        {
            id: 2,
            question: "Comment écrit-on correctement le pluriel de 'cheval' ?",
            options: [
                "chevals",
                "chevaux",
                "chevaus",
                "chevales"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "Quelle est la capitale de la Côte d'Ivoire ?",
            options: [
                "Abidjan",
                "Yamoussoukro",
                "Bouaké",
                "San-Pédro"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "Dans la phrase 'Le chat mange sa pâtée', quel est le sujet ?",
            options: [
                "mange",
                "Le chat",
                "sa pâtée",
                "pâtée"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "Combien y a-t-il de continents sur Terre ?",
            options: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: 2
        }
    ],
    
    "6eme-3eme": [
        {
            id: 1,
            question: "Quelle est la valeur de x dans l'équation 2x + 5 = 13 ?",
            options: [
                "x = 3",
                "x = 4",
                "x = 5",
                "x = 6"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Quel est le complément d'objet direct dans la phrase 'Marie lit un livre' ?",
            options: [
                "Marie",
                "lit",
                "un livre",
                "Il n'y en a pas"
            ],
            correct: 2
        },
        {
            id: 3,
            question: "En quelle année a eu lieu la Révolution française ?",
            options: [
                "1789",
                "1792",
                "1799",
                "1804"
            ],
            correct: 0
        },
        {
            id: 4,
            question: "Quelle est la capitale de l'Australie ?",
            options: [
                "Sydney",
                "Melbourne",
                "Canberra",
                "Perth"
            ],
            correct: 2
        },
        {
            id: 5,
            question: "Quelle est la formule chimique de l'eau ?",
            options: [
                "H2O",
                "CO2",
                "NaCl",
                "CH4"
            ],
            correct: 0
        },
        {
            id: 6,
            question: "Si tous les chats sont des mammifères et que Félix est un chat, alors :",
            options: [
                "Félix n'est pas un mammifère",
                "Félix est un mammifère",
                "On ne peut pas conclure",
                "Félix est un oiseau"
            ],
            correct: 1
        }
    ],
    
    "serie-a2": [
        {
            id: 1,
            question: "Selon Descartes, quelle est la première vérité indubitable ?",
            options: [
                "Dieu existe",
                "Je pense, donc je suis",
                "Le monde existe",
                "La science est vraie"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Quel est le temps du verbe dans 'Il aurait mangé' ?",
            options: [
                "Conditionnel présent",
                "Conditionnel passé",
                "Subjonctif passé",
                "Indicatif plus-que-parfait"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "What is the past participle of 'to write'?",
            options: [
                "wrote",
                "writing",
                "written",
                "writes"
            ],
            correct: 2
        },
        {
            id: 4,
            question: "Qui a écrit 'L'Étranger' ?",
            options: [
                "Jean-Paul Sartre",
                "Albert Camus",
                "André Malraux",
                "Simone de Beauvoir"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "Qu'est-ce que l'existentialisme selon Sartre ?",
            options: [
                "L'existence précède l'essence",
                "L'essence précède l'existence",
                "Existence et essence sont identiques",
                "Ni existence ni essence n'existent"
            ],
            correct: 0
        }
    ],
    
    "serie-a1": [
        {
            id: 1,
            question: "Quelle est la dérivée de f(x) = x² + 3x + 2 ?",
            options: [
                "f'(x) = 2x + 3",
                "f'(x) = x + 3",
                "f'(x) = 2x + 2",
                "f'(x) = x² + 3"
            ],
            correct: 0
        },
        {
            id: 2,
            question: "Qui était le premier président de la Côte d'Ivoire ?",
            options: [
                "Henri Konan Bédié",
                "Félix Houphouët-Boigny",
                "Laurent Gbagbo",
                "Alassane Ouattara"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "Quelle est la loi d'Ohm ?",
            options: [
                "U = R × I",
                "P = U × I",
                "E = mc²",
                "F = ma"
            ],
            correct: 0
        },
        {
            id: 4,
            question: "Selon Kant, qu'est-ce qu'un impératif catégorique ?",
            options: [
                "Un commandement conditionnel",
                "Un commandement inconditionnel",
                "Une suggestion morale",
                "Une loi naturelle"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "Quel est le registre de langue de 'Il pleut des cordes' ?",
            options: [
                "Soutenu",
                "Courant",
                "Familier",
                "Argotique"
            ],
            correct: 2
        }
    ],
    
    "serie-d": [
        {
            id: 1,
            question: "Quelle est la fonction principale des mitochondries ?",
            options: [
                "Synthèse des protéines",
                "Production d'énergie (ATP)",
                "Stockage de l'ADN",
                "Digestion cellulaire"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Quelle est la limite de (sin x)/x quand x tend vers 0 ?",
            options: [
                "0",
                "1",
                "∞",
                "La limite n'existe pas"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "Quelle est l'unité de la force dans le système international ?",
            options: [
                "Joule",
                "Watt",
                "Newton",
                "Pascal"
            ],
            correct: 2
        },
        {
            id: 4,
            question: "Quel est le processus par lequel les plantes produisent leur nourriture ?",
            options: [
                "Respiration",
                "Photosynthèse",
                "Fermentation",
                "Digestion"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "Quelle est la formule de l'énergie cinétique ?",
            options: [
                "E = mc²",
                "E = mgh",
                "E = ½mv²",
                "E = Pt"
            ],
            correct: 2
        }
    ]
};

// Fonction pour obtenir les questions selon le niveau
function getQuestionsByLevel(level) {
    return examQuestions[level] || [];
}

// Fonction pour mélanger les questions
function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Fonction pour évaluer les réponses
function evaluateAnswers(questions, userAnswers) {
    let score = 0;
    const total = questions.length;
    
    questions.forEach(question => {
        if (userAnswers[question.id] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / total) * 100);
    let remark = "";
    
    if (percentage >= 80) {
        remark = "Excellent ! Vous avez les compétences requises pour enseigner à ce niveau.";
    } else if (percentage >= 60) {
        remark = "Bien ! Vous avez de bonnes bases, mais quelques révisions seraient bénéfiques.";
    } else if (percentage >= 40) {
        remark = "Passable. Il serait recommandé de renforcer vos connaissances avant d'enseigner.";
    } else {
        remark = "Insuffisant. Nous vous recommandons de réviser davantage avant de postuler.";
    }
    
    return {
        score: score,
        total: total,
        percentage: percentage,
        remark: remark
    };
}

