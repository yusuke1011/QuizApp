//--------------------------------
// ページを更新する関数
// [引数]なし
//--------------------------------
const screenUpdate = () => {
    //10問目まで出題されていない場合
    if(count < 10){
        let countNum = count + 1;

        //何問目の出題かをクイズインスタンスにセット
        quiz.setQuizDataIndex = count;
        console.log(`${countNum}問目のクイズデータをセットしました`);

        //文章の更新
        title.innerHTML = `問題${count + 1}`;
        subTitle.innerText = '[ジャンル] ' + quiz.category + '\n'; 
        subTitle.innerText += '[難易度] ' + quiz.difficulty;
        questionMessage.innerHTML = quiz.question;

        //Answerボタンの作成
        createAnswerButton(quiz.answers);

        count++;
    }
    //10問目の出題が終わった場合
    else{
        //文章の更新
        title.innerHTML = 'あなたの正答数は' + correctCount + 'です！！';
        questionMessage.innerHTML = '再度チャレンジしたい場合は以下をクリック！！';
        subTitle.innerText = null;
        
        //returnボタンの生成
        let returnButton = document.createElement('button');
        returnButton.textContent = 'ホームに戻る';
        returnButton.addEventListener('click', () => {
            //returnボタン押下時はページを再読み込みさせる
            location.href = "index.html";
        });
        bottom.appendChild(returnButton);
    }
}

//--------------------------------
// 回答の選択肢ボタンを生成する関数
// [引数]回答の選択肢が格納されている配列
//--------------------------------
const createAnswerButton = (_quizAnswers) => {

    //配列をコピー
    const copiedQuizAnswers = _quizAnswers.slice();

    copiedQuizAnswers.forEach((element, num) => {
        let obj = {}; //生成したボタン格納用オブジェクト
        obj = document.createElement('button');
        obj.textContent = element;
        answers[num].appendChild(obj);
        obj.addEventListener('click', () => {
            //Answerボタンを削除
            deleteAnswerButton(); 
            //ページを更新
            screenUpdate(); 
            //正答か否かを判定
            judgeCorrectAnswer(num); 
        });
    });
};

//--------------------------------
// 回答の選択肢ボタンを削除する関数
// [引数]なし
//--------------------------------
const deleteAnswerButton = () => {
    answers.forEach((element) => {
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    })
}

//--------------------------------
// 何問正答したかを算出する関数
// [引数]選択した回答選択肢の番号
//--------------------------------
const judgeCorrectAnswer = (_num) => {
    if(quiz.answers[_num] === quiz.correctAnswer){
        correctCount++;
    }
};