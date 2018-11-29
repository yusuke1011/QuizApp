(() => {
    const title = document.getElementById('title');
    const questionMessage = document.getElementById('questionMessage');
    const start = document.getElementById('start');
    const bottom = document.getElementById('bottom');
    const answers = [];

    for(i = 0; i < 4; i++){
        num = i + 1;
        answers.push(document.getElementById('answer'+num));
    }

    const quiz = new QuizClass;

    let count = 0;
    let correcCount = 0;

    const createAnswerButton = (_quizAnswers) => {

        const copiedQuizAnswers = _quizAnswers.slice();
        const _answerButtons = [];

        copiedQuizAnswers.forEach((element, num) => {
            let obj = {};
            obj = document.createElement('button');
            obj.textContent = element;
            _answerButtons.push(obj);
            answers[num].appendChild(obj);
            obj.addEventListener('click', () => {
                deleteAnswerButton();
                screenUpdate();
                judgeCorrectAnswer(num);
            });
        });

        return _answerButtons;
    };

    const screenUpdate = () => {

        if(count < 10){
            quiz.setQuizDataIndex = count;

            //文章の更新
            let countNum = count +1;
            title.innerHTML = '問題' + countNum;
            questionMessage.innerHTML = quiz.question;

            //Answerボタンの作成
            createAnswerButton(quiz.answers);

            count++;
        }
        else{
            //文章の更新
            title.innerHTML = 'あなたの正答数は' + correcCount + 'です！！';
            questionMessage.innerHTML = '再度チャレンジしたい場合は以下をクリック！！';
            let returnButton = document.createElement('button');
            returnButton.textContent = 'ホームに戻る';
            returnButton.addEventListener('click', () => {
                location.href = "index.html";
            })
            bottom.appendChild(returnButton);

        }

    }

    const judgeCorrectAnswer = (_num) => {
        if(quiz.answers[_num] === quiz.correctAnswer){
            correcCount++;
        }
    };

    const deleteAnswerButton = () => {
        answers.forEach((element) => {
            while(element.firstChild){
                element.removeChild(element.firstChild);
            }
        })
    }

    questionMessage.innerHTML = '以下のボタンをクリック';
    title.innerHTML = 'ようこそ';

    start.addEventListener('click', () => {

        fetch('https://opentdb.com/api.php?amount=10')
        .then((response) => {
        console.log('Response Dataを取得しました：', response);
        return response.json();
        })
        .then((quizDataObj) => {
        console.log('Promise Valueを取得しました：', quizDataObj);

        quiz.setQuizDataObj = quizDataObj;
        
        bottom.removeChild(start);

        //最初の問題（Index = 0）をセット
        screenUpdate();
        })
    });
})();