from src.models.user import db
from datetime import datetime
import json

class ExamResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_name = db.Column(db.String(100), nullable=False)
    candidate_phone = db.Column(db.String(20), nullable=True)
    score = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False, default=15)
    answers = db.Column(db.Text, nullable=False)  # JSON string of answers
    correct_answers = db.Column(db.Text, nullable=False)  # JSON string of correct answers
    exam_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    time_taken = db.Column(db.Integer, nullable=True)  # in seconds
    
    def __repr__(self):
        return f'<ExamResult {self.candidate_name}: {self.score}/{self.total_questions}>'
    
    def get_answers_dict(self):
        return json.loads(self.answers)
    
    def get_correct_answers_dict(self):
        return json.loads(self.correct_answers)
    
    def get_percentage(self):
        return round((self.score / self.total_questions) * 100, 1)
    
    def get_remark(self):
        percentage = self.get_percentage()
        if percentage < 50:
            return "Renforcez vos connaissances"
        elif percentage < 75:
            return "Bravo mais améliorez vos bases"
        else:
            return "Félicitations, vous serez sans aucun doute un membre précieux de notre structure"

