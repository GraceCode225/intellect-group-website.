from flask import Blueprint, request, jsonify
from src.models.exam import db, ExamResult
import json
from datetime import datetime

exam_bp = Blueprint('exam', __name__)

# Questions d'examen
EXAM_QUESTIONS = {
    "mathematics": [
        {
            "id": 1,
            "question": "Résolvez l'équation : 2x + 5 = 13",
            "options": ["x = 3", "x = 4", "x = 5", "x = 6"],
            "correct": 1
        },
        {
            "id": 2,
            "question": "Calculez : (3 + 4) × 2 - 5",
            "options": ["9", "10", "11", "12"],
            "correct": 0
        },
        {
            "id": 3,
            "question": "Quelle est la valeur de √64 ?",
            "options": ["6", "7", "8", "9"],
            "correct": 2
        },
        {
            "id": 4,
            "question": "Si un triangle a des angles de 60°, 60° et x°, quelle est la valeur de x ?",
            "options": ["30°", "45°", "60°", "90°"],
            "correct": 2
        },
        {
            "id": 5,
            "question": "Calculez : 15% de 200",
            "options": ["25", "30", "35", "40"],
            "correct": 1
        }
    ],
    "grammar": [
        {
            "id": 6,
            "question": "Quel est le pluriel de 'cheval' ?",
            "options": ["chevals", "chevaux", "chevaus", "chevales"],
            "correct": 1
        },
        {
            "id": 7,
            "question": "Conjuguez le verbe 'aller' à la première personne du singulier au présent :",
            "options": ["je vais", "j'alle", "je va", "j'aille"],
            "correct": 0
        },
        {
            "id": 8,
            "question": "Quelle est la nature du mot 'rapidement' ?",
            "options": ["adjectif", "adverbe", "nom", "verbe"],
            "correct": 1
        },
        {
            "id": 9,
            "question": "Accordez correctement : 'Les fleurs sont ___'",
            "options": ["beau", "beaux", "belle", "belles"],
            "correct": 3
        },
        {
            "id": 10,
            "question": "Quel est le féminin de 'acteur' ?",
            "options": ["acteure", "actrice", "acteuresse", "acteuse"],
            "correct": 1
        }
    ],
    "physics": [
        {
            "id": 11,
            "question": "Quelle est l'unité de mesure de la force ?",
            "options": ["Joule", "Newton", "Watt", "Pascal"],
            "correct": 1
        },
        {
            "id": 12,
            "question": "À quelle vitesse se propage la lumière dans le vide ?",
            "options": ["300 000 km/s", "150 000 km/s", "450 000 km/s", "600 000 km/s"],
            "correct": 0
        },
        {
            "id": 13,
            "question": "Quelle est la formule de l'énergie cinétique ?",
            "options": ["E = mc²", "E = ½mv²", "E = mgh", "E = Pt"],
            "correct": 1
        },
        {
            "id": 14,
            "question": "Quel est le symbole chimique de l'or ?",
            "options": ["Go", "Au", "Or", "Ag"],
            "correct": 1
        },
        {
            "id": 15,
            "question": "Combien y a-t-il d'électrons dans un atome neutre de carbone ?",
            "options": ["4", "6", "8", "12"],
            "correct": 1
        }
    ]
}

@exam_bp.route('/questions', methods=['GET'])
def get_questions():
    """Retourne toutes les questions d'examen"""
    all_questions = []
    all_questions.extend(EXAM_QUESTIONS["mathematics"])
    all_questions.extend(EXAM_QUESTIONS["grammar"])
    all_questions.extend(EXAM_QUESTIONS["physics"])
    
    # Retourner les questions sans les bonnes réponses
    questions_for_exam = []
    for q in all_questions:
        questions_for_exam.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"]
        })
    
    return jsonify(questions_for_exam)

@exam_bp.route('/submit', methods=['POST'])
def submit_exam():
    """Soumet les réponses de l'examen et calcule le score"""
    data = request.get_json()
    
    candidate_name = data.get('name', '')
    candidate_phone = data.get('phone', '')
    answers = data.get('answers', {})
    time_taken = data.get('time_taken', 0)
    
    if not candidate_name:
        return jsonify({'error': 'Le nom est requis'}), 400
    
    # Calculer le score
    score = 0
    correct_answers = {}
    all_questions = []
    all_questions.extend(EXAM_QUESTIONS["mathematics"])
    all_questions.extend(EXAM_QUESTIONS["grammar"])
    all_questions.extend(EXAM_QUESTIONS["physics"])
    
    for question in all_questions:
        question_id = str(question["id"])
        correct_answers[question_id] = question["correct"]
        
        if question_id in answers:
            if int(answers[question_id]) == question["correct"]:
                score += 1
    
    # Sauvegarder le résultat
    exam_result = ExamResult(
        candidate_name=candidate_name,
        candidate_phone=candidate_phone,
        score=score,
        total_questions=15,
        answers=json.dumps(answers),
        correct_answers=json.dumps(correct_answers),
        time_taken=time_taken
    )
    
    db.session.add(exam_result)
    db.session.commit()
    
    # Retourner le résultat
    return jsonify({
        'score': score,
        'total': 15,
        'percentage': exam_result.get_percentage(),
        'remark': exam_result.get_remark(),
        'exam_id': exam_result.id
    })

@exam_bp.route('/admin/results', methods=['POST'])
def get_admin_results():
    """Retourne tous les résultats pour l'administration"""
    data = request.get_json()
    admin_code = data.get('code', '')
    
    if admin_code != '1231':
        return jsonify({'error': 'Code d\'accès incorrect'}), 401
    
    results = ExamResult.query.order_by(ExamResult.exam_date.desc()).all()
    
    results_data = []
    for result in results:
        results_data.append({
            'id': result.id,
            'name': result.candidate_name,
            'phone': result.candidate_phone,
            'score': result.score,
            'total': result.total_questions,
            'percentage': result.get_percentage(),
            'remark': result.get_remark(),
            'date': result.exam_date.strftime('%d/%m/%Y'),
            'time': result.exam_date.strftime('%H:%M:%S'),
            'time_taken': result.time_taken,
            'answers': result.get_answers_dict(),
            'correct_answers': result.get_correct_answers_dict()
        })
    
    return jsonify(results_data)

