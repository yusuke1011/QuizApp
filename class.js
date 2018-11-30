//APIから取得したクイズオブジェクトとクイズ番号（0～9）をセットし、
//カテゴリーや問題文などを取得するクラス
class QuizClass {
    constructor(){ 
        //初期化（必要ないかもしれませんが・・・）
        this.quizDataArray = [];
        this.quizData = {};
    }

    //setter
    set setQuizDataObj(_quizDataObj){
        this.quizDataArray = _quizDataObj.results;
    }
    set setQuizDataIndex(_quizDataIndex){
        this.quizData = this.quizDataArray[_quizDataIndex];
    }

    //getter
    get category(){
        return this.quizData.category;
    };
    get type(){
        return this.quizData.type;
    }
    get difficulty(){
        return this.quizData.difficulty;
    }
    get question(){
        return this.quizData.question;
    }
    get answers(){
        //正解と不正解を含めた回答群を生成
        const _answers = this.quizData.incorrect_answers.slice();
        _answers.push(this.quizData.correct_answer);

        //シャッフル（sort関数は使用せず、Fisher–Yatesアルゴリズムを使用）
        for (let i = _answers.length -1; i>0; i--){
            const rand = Math.floor(Math.random() * (i+1));
            [_answers[i], _answers[rand]] = [_answers[rand], _answers[i]]
        }

        return _answers;
    }
    get correctAnswer(){
        return this.quizData.correct_answer;
    }
}