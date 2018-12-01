//APIから取得したクイズオブジェクトとクイズ番号（0～9）をセットし、
//カテゴリーや問題文などを取得するクラス
class QuizClass {
    constructor(_quizData){ 
        //初期化処理
        this.category = _quizData.category;
        this.type = _quizData.type;
        this.difficulty = _quizData.difficulty;
        this.question = _quizData.question;
        this.incorrectAnswers = _quizData.incorrect_answers.slice();
        this.correctAnswer = _quizData.correct_answer;
    }

    answers(){
        //正解と不正解を含めた回答群を生成
        const _answers = this.incorrectAnswers.slice();
        _answers.push(this.correctAnswer);

        //シャッフル（sort関数は使用せず、Fisher–Yatesアルゴリズムを使用）
        for (let i = _answers.length - 1; i > 0; i--){
            const rand = Math.floor(Math.random() * (i + 1));
            [_answers[i], _answers[rand]] = [_answers[rand], _answers[i]];
        }

        return _answers;
    }
}