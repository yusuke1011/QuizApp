//--------------------------------
// ページを更新する関数
// [引数]クイズインスタンスを格納した配列
//--------------------------------
const screenUpdate = (_quizinstances) => {
    const quizNum = 10;
    //10問目まで出題されていない場合
    if(count < quizNum){

        const quizinstance = _quizinstances[count];
        console.log(`${count + 1}問目のクイズデータをセットしました`);

        //文章の更新
        title.innerHTML = `問題${count + 1}`;
        subTitle.innerText = '[ジャンル] ' + quizinstance.category + '\n'; 
        subTitle.innerText += '[難易度] ' + quizinstance.difficulty;
        questionMessage.innerHTML = quizinstance.question;

        //Answerボタンの作成
        createAnswerButton(_quizinstances);

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
// [引数]クイズインスタンスを格納した配列
//--------------------------------
const createAnswerButton = (_quizinstances) =>{
    const quizinstance = _quizinstances[count];
    const answerElements = document.getElementsByTagName('td');

    //配列をコピー
    const copiedQuizAnswers = quizinstance.answers().slice();

    copiedQuizAnswers.forEach((element, index) => {
        let buttonElement = document.createElement('button');
        buttonElement.textContent = element;
        answerElements[index].appendChild(buttonElement);
        buttonElement.addEventListener('click', () => {
            //Answerボタンを削除
            deleteAnswerButton(); 
            //ページを更新
            screenUpdate(_quizinstances); 
            //正答か否かを判定
            judgeCorrectAnswer(quizinstance, index); 
        });
    });
};

//--------------------------------
// 回答の選択肢ボタンを削除する関数
// [引数]なし
//--------------------------------
const deleteAnswerButton = () => {
    const tabaleElement = document.getElementsByTagName('td');
    
    //getElementsByTagName('td')で取得した配列に対してforEachが使用できなかったのでfor分を使用しました。
    for(let i = 0; i < tabaleElement.length; i++){
        while(tabaleElement[i].firstChild){
            tabaleElement[i].removeChild(tabaleElement[i].firstChild);
        }
    }
};

//--------------------------------
// 何問正答したかを算出する関数
// [引数]選択した回答選択肢の番号
//      クイズインスタンス
//--------------------------------
const judgeCorrectAnswer = (_quizinstance, _num) => {
    if(_quizinstance.answers()[_num] === _quizinstance.correctAnswer){
        correctCount++;
    }
};