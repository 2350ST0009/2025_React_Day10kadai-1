import "./App.css";
import { useState, useEffect, ChangeEvent } from "react";

const App: React.FC = () => {
  // 初期値を localStorage から取得（戻り値は number）
  const getInitialCount = (): number => {
    const savedNum = localStorage.getItem("count");
    return savedNum ? Number(savedNum) : 0;
  };

  const [num, setNum] = useState<number>(getInitialCount);
  const [inputValue, setInputValue] = useState<string>(""); // フォーム入力値

  // 値が更新されたときに localStorage に保存
  useEffect(() => {
    localStorage.setItem("count", num.toString());
  }, [num]);

  // 入力フォームの変更イベント
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // 入力された値を数値としてセット
  const handleSetCount = (): void => {
    const parsedValue = Number(inputValue);
    if (!isNaN(parsedValue)) {
      setNum(parsedValue);
      setInputValue(""); // 入力値をリセット
    } else {
      alert("数値を入力してください。");
    }
  };

  // カウント操作
  const countUp = (): void => {
    setNum((prevNum) => prevNum + 1);
  };

  const countDown = (): void => {
    setNum((prevNum) => (prevNum > 0 ? prevNum - 1 : 0));
  };

  // 実際の処理
  return (
    <>
      <div className="App-header">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="カウント開始値を入力"
            className="input"
          />
          <button onClick={handleSetCount} className="button">
            設定
          </button>
        </div>

        <span className="num">{num}</span>

        <div className="button-container">
          <button className="button2" onClick={countUp} aria-label="Increase">
            +
          </button>
          <button className="button2" onClick={countDown} aria-label="Decrease">
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
