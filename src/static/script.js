// Variables globales
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = {};
let examTimer = null;
let timeRemaining = 1200; // 20 minutes en secondes
let examStartTime = null;

// Navigation entre les pages
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    document.getElementById(pageId).classList.add('active');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[href="#${pageId}"]`).classList.add('active');
}

function showHome() {
    showPage('home');
    resetExam();
}

function showExam() {
    showPage('exam');
    document.getElementById('exam-form').style.display = 'block';
    document.getElementById('exam-questions').style.display = 'none';
    document.getElementById('exam-results').style.display = 'none';
}

function showAdmin() {
    showPage('admin');
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
}

// Gestion de l'examen
async function startExam() {
    const candidateName = document.getElementById('candidateName').value.trim();
    const examLevel = document.getElementById('examLevel').value;
    
    if (!candidateName) {
        alert('Veuillez entrer votre nom complet.');
        return;
    }
    
    if (!examLevel) {
        alert('Veuillez sélectionner un niveau d\'enseignement.');
        return;
    }
    
    try {
        // Charger les questions selon le niveau sélectionné
        const levelQuestions = getQuestionsByLevel(examLevel);
        
        if (levelQuestions.length === 0) {
            alert('Aucune question disponible pour ce niveau.');
            return;
        }
        
        // Mélanger les questions et prendre les 5 premières
        questions = shuffleQuestions(levelQuestions).slice(0, 5);
        
        // Initialiser l'examen
        currentQuestionIndex = 0;
        userAnswers = {};
        examStartTime = new Date();
        
        // Afficher les questions
        document.getElementById('exam-form').style.display = 'none';
        document.getElementById('exam-questions').style.display = 'block';
        
        // Démarrer le chronomètre
        startTimer();
        
        // Afficher la première question
        displayQuestion();
        
    } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        alert('Erreur lors du chargement de l\'examen. Veuillez réessayer.');
    }
}

function startTimer() {
    timeRemaining = 1200; // 20 minutes
    updateTimerDisplay();
    
    examTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(examTimer);
            alert('Temps écoulé ! L\'examen va être soumis automatiquement.');
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Changer la couleur quand il reste moins de 5 minutes
    if (timeRemaining < 300) {
        timerElement.style.color = '#ff4444';
    }
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const container = document.getElementById('questionsContainer');
    
    container.innerHTML = `
        <div class="question-card fade-in">
            <h3 class="question-title">Question ${currentQuestionIndex + 1}</h3>
            <p class="question-text">${question.question}</p>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <div class="option-item ${userAnswers[question.id] == index ? 'selected' : ''}" 
                         onclick="selectAnswer(${question.id}, ${index})">
                        <input type="radio" name="question_${question.id}" value="${index}" 
                               ${userAnswers[question.id] == index ? 'checked' : ''}>
                        <span>${option}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Mettre à jour la barre de progression
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Mettre à jour le compteur
    document.getElementById('questionCounter').textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    
    // Mettre à jour les boutons de navigation
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-flex';
    document.getElementById('submitBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-flex' : 'none';
}

function selectAnswer(questionId, answerIndex) {
    userAnswers[questionId] = answerIndex;
    
    // Mettre à jour l'affichage
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    event.currentTarget.querySelector('input').checked = true;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

async function submitExam() {
    if (examTimer) {
        clearInterval(examTimer);
    }
    
    const candidateName = document.getElementById('candidateName').value.trim();
    const candidatePhone = document.getElementById('candidatePhone').value.trim();
    const examLevel = document.getElementById('examLevel').value;
    
    // Calculer le temps pris
    const timeTaken = examStartTime ? Math.floor((new Date() - examStartTime) / 1000) : 0;
    
    // Évaluer les réponses localement
    const result = evaluateAnswers(questions, userAnswers);
    
    // Ajouter les informations du candidat
    result.name = candidateName;
    result.phone = candidatePhone;
    result.level = examLevel;
    result.time_taken = timeTaken;
    result.date = new Date().toLocaleDateString('fr-FR');
    result.time = new Date().toLocaleTimeString('fr-FR');
    
    // Sauvegarder le résultat localement (optionnel)
    saveResultLocally(result);
    
    // Afficher les résultats
    displayResults(result);
}

function displayResults(result) {
    document.getElementById('exam-questions').style.display = 'none';
    document.getElementById('exam-results').style.display = 'block';
    
    document.getElementById('scoreValue').textContent = result.score;
    document.getElementById('percentageValue').textContent = result.percentage;
    document.getElementById('remarkText').textContent = result.remark;
    
    // Animation du score
    animateScore(result.score);
}

function animateScore(finalScore) {
    const scoreElement = document.getElementById('scoreValue');
    let currentScore = 0;
    const increment = finalScore / 20;
    
    const animation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(animation);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, 50);
}

function saveResultLocally(result) {
    // Sauvegarder dans localStorage pour la démo
    let savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    result.id = Date.now(); // ID unique basé sur le timestamp
    savedResults.push(result);
    localStorage.setItem('examResults', JSON.stringify(savedResults));
}

function resetExam() {
    if (examTimer) {
        clearInterval(examTimer);
        examTimer = null;
    }
    
    currentQuestionIndex = 0;
    questions = [];
    userAnswers = {};
    timeRemaining = 1200;
    examStartTime = null;
    
    document.getElementById('candidateName').value = '';
    document.getElementById('candidatePhone').value = '';
    document.getElementById('examLevel').value = '';
    document.getElementById('timer').textContent = '20:00';
    document.getElementById('timer').style.color = 'white';
}

// Gestion de l'administration
async function adminLogin() {
    const code = document.getElementById('adminCode').value;
    
    if (!code) {
        alert('Veuillez entrer le code d\'accès.');
        return;
    }
    
    // Code d'accès simple pour la démo
    if (code === 'admin123') {
        const results = JSON.parse(localStorage.getItem('examResults') || '[]');
        displayAdminResults(results);
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
    } else {
        alert('Code d\'accès incorrect.');
    }
}

function displayAdminResults(results) {
    const container = document.getElementById('resultsTable');
    
    if (results.length === 0) {
        container.innerHTML = '<p>Aucun résultat d\'examen disponible.</p>';
        return;
    }
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Niveau</th>
                    <th>Score</th>
                    <th>Pourcentage</th>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Temps (min)</th>
                    <th>Remarque</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    results.forEach(result => {
        const timeTakenMin = result.time_taken ? Math.floor(result.time_taken / 60) : 'N/A';
        const levelDisplay = getLevelDisplayName(result.level);
        tableHTML += `
            <tr>
                <td>${result.name}</td>
                <td>${result.phone || 'N/A'}</td>
                <td>${levelDisplay}</td>
                <td>${result.score}/${result.total}</td>
                <td>${result.percentage}%</td>
                <td>${result.date}</td>
                <td>${result.time}</td>
                <td>${timeTakenMin}</td>
                <td>${result.remark}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

function getLevelDisplayName(level) {
    const levelNames = {
        'ce2-cm1': 'CE2-CM1',
        '6eme-3eme': '6ème-3ème',
        'serie-a2': 'Série A2',
        'serie-a1': 'Série A1',
        'serie-d': 'Série D'
    };
    return levelNames[level] || level;
}

function showDetailedResults(resultId, candidateName) {
    // Cette fonction pourrait ouvrir une modal avec les détails des réponses
    alert(`Détails pour ${candidateName} - Fonctionnalité à implémenter si nécessaire`);
}

async function refreshResults() {
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    displayAdminResults(results);
}

// Gestion des liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des liens de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            
            if (targetPage === 'home') {
                showHome();
            } else if (targetPage === 'exam') {
                showExam();
            } else if (targetPage === 'admin') {
                showAdmin();
            }
        });
    });
    
    // Gestion de la touche Entrée pour les champs de saisie
    document.getElementById('candidateName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startExam();
        }
    });
    
    document.getElementById('adminCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLogin();
        }
    });
    
    // Afficher la page d'accueil par défaut
    showHome();
});

// Prévenir la fermeture accidentelle pendant l'examen
window.addEventListener('beforeunload', function(e) {
    if (examTimer) {
        e.preventDefault();
        e.returnValue = 'Vous êtes en train de passer un examen. Êtes-vous sûr de vouloir quitter ?';
    }
});

