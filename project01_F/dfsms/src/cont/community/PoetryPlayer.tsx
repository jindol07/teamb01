import React, { useState, useRef } from "react";

const PoetryPlayer: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 시 내용과 타임라인 (초 단위)
/*
데일리 푸드 

맑은 햇살 가득 품은  과일과
새벽 안개  머금은 푸른 잎사귀들
손가락 끝으로  예약한  
당신의 마음이 배달의 아침을 엽니다
땀의 정직함이 빛나는 아침
당신의 식탁은 행복한 웃음으로 가득합니다.

*/
// json  데이터 
//  문장은  { }
// 문장들 [ { },  { },  { }, ] 
  const poem = [
    { time: 0, text: "데일리 푸드 " },
    { time: 2, text: "맑은 햇살 가득 품은  과일과" },
    { time: 5, text: "새벽 안개  머금은 푸른 잎사귀들" },
    { time: 8, text: "손가락 끝으로  예약한  " },
    { time: 11, text: "당신의 마음이 배달의 아침을 엽니다" },
    { time: 14, text: "땀의 정직함이 빛나는 아침"},
    { time: 17, text: "당신의 식탁은 행복한 웃음으로 가득합니다"}


  ];

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current?.currentTime || 0;
    const lineIndex = poem.findIndex(
      (line, idx) =>
        currentTime >= line.time &&
        (idx === poem.length - 1 || currentTime < poem[idx + 1].time)
    );
    if (lineIndex !== -1 && lineIndex !== currentLine) {
      setCurrentLine(lineIndex);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/5418007.png" alt="Poetry Icon" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> 
      </div>

      {/* 오디오 플레이어 */}
      <audio
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
      >
        <source src="/poem.mp3" type="audio/mpeg" />
        브라우저가 오디오 태그를 지원하지 않습니다.
      </audio>

      {/* 시 내용 표시 */}
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>시 내용</h2>
        {poem.map((line, idx) => (
          <p
            key={idx}
            style={{
              fontSize: "1.1em",
              fontWeight: idx === currentLine ? "bold" : "normal",
              color: idx === currentLine ? "#d9534f" : "#333",
              transition: "all 0.3s ease"
            }}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PoetryPlayer;
