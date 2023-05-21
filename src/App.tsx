import { useEffect, useState } from "react";
import { bubbleSort } from "./algos/Bubble";
import { selectionSort } from "./algos/Selection";
import "./App.css";

export default function App() {
  const [algo, setAlgo] = useState(1);
  const [array, setArray] = useState<any>([]);
  const [iter, setIter] = useState<any>(0);
  const [speed, setSpeed] = useState<any>(100);
  const [isSorting, setIsSorting] = useState(false);
  var animations: any[] = [];

  useEffect(() => {
    generateArray();
  }, []);

  let m_bg = "#E8E8E8";
  let green = "#00E091";
  var n = Math.floor(window.innerWidth / 15);

  const reset = () => {
    window.location.reload();
  };

  function handleSort() {
    switch (algo) {
      case 1:
        selectionSortAnimate();
        break;
      case 2:
        bubbleSortAnimate();
        break;
    }
  }

  function handleHighlight(e: number) {
    document.querySelectorAll(".algo").forEach((e: any) => {
      e.classList.remove("text-green-300");
    });

    document.getElementById(`${e}`)?.classList.add("text-green-300");
  }

  function handleSpeedBtn(e: string) {
    document.querySelectorAll(".speed").forEach((e: any) => {
      e.classList.remove("text-green-300");
    });

    document.getElementById(`${e}`)?.classList.add("text-green-300");
  }

  const generateArray = () => {
    setIsSorting(false);
    const newArray = [];
    for (let i = 0; i < n; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    const arrayBar: any = document.getElementsByClassName("array-bar");
    for (const key of arrayBar) {
      key.style.backgroundColor = `${m_bg}`;
    }
    setIter(0);
    setArray(newArray);
  };

  //Bubble

  const bubbleSortAnimate = () => {
    animations = bubbleSort(array);

    const arrayBars: any = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [index1, index2] = animations[i];

      setTimeout(() => {
        setIter((iter: any) => iter + 1);

        const barStyle1 = arrayBars[index1].style;
        const barStyle2 = arrayBars[index2].style;

        barStyle1.backgroundColor = green;
        barStyle2.backgroundColor = green;

        // Swap  heights
        const tempHeight = barStyle1.height;
        barStyle1.height = barStyle2.height;
        barStyle2.height = tempHeight;

        // Reset the color
        setTimeout(() => {
          barStyle1.backgroundColor = `${m_bg}`;
          barStyle2.backgroundColor = `${m_bg}`;
          console.log("clr");
        }, 100);
      }, i * speed);
    }
  };

  //Selection
  const selectionSortAnimate = () => {
    animations = selectionSort(array);
    const arrayBars: any = document.getElementsByClassName("array-bar");
    var e = 0;
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2] = animations[i];

      setTimeout(() => {
        setIter((iter: any) => iter + 1);
        const barStyle1 = arrayBars[index1].style;
        const barStyle2 = arrayBars[index2].style;

        // Highlighting the bars
        barStyle1.backgroundColor = green;
        barStyle2.backgroundColor = "#FFC700";

        // Swap the heights
        const tempHeight = barStyle1.height;
        barStyle1.height = barStyle2.height;
        barStyle2.height = tempHeight;

        // setTimeout(() => {
        // barStyle1.backgroundColor = "rgb(74 222 128)";
        //  barStyle2.backgroundColor = "grey";
        // }, 500);

        e += 1;

        if (e == n) {
          console.log("e=n");
          const arrayBar: any = document.getElementsByClassName("array-bar");
          for (const key of arrayBar) {
            key.style.backgroundColor = green;
          }
        }
      }, i * speed);
    }
  };

  return (
    <div className="App relative  text-xs md:text-[.9rem] text-white flex flex-col items-center justify-start gap-12 py-8  md:px-12  px-8 h-screen ">
      <section className="flex z-[4] font-semibold tracking-wider self-start justify-self-start  gap-4 justify-start  ">
        <button
          className="algo text-green-300 tracking-wide"
          id="1"
          onClick={() => {
            setAlgo(1);
            handleHighlight(1);
          }}
        >
          Selection Sort
        </button>
        <button
          className=" algo tracking-wide"
          id="2"
          onClick={() => {
            setAlgo(2);
            handleHighlight(2);
          }}
        >
          Bubble Sort
        </button>
      </section>
      <div className="array-container h-[63vh] z-[4] flex flex-col justify-center items-center   gap-2">
        <section className=" flex h-full items-end gap-2 md:gap-1">
          {array.map((value: any, index: any) => (
            <div
              className="array-bar shadow md:w-[.6vw] w-[1vw]  rounded-t-[.031rem]"
              key={index}
              style={{
                height: `${value / 2}vh`,

                backgroundColor: `${m_bg}`,
              }}
            ></div>
          ))}
        </section>
        <section className="flex self-end gap-4 justify-end ">
          <button
            id="slow"
            className="speed"
            onClick={() => {
              setSpeed(500);
              handleSpeedBtn("slow");
            }}
          >
            Slow
          </button>
          <button
            id="fast"
            className="text-green-300 speed"
            onClick={() => {
              setSpeed(100);
              handleSpeedBtn("fast");
            }}
          >
            Fast
          </button>
          <button className="" onClick={generateArray}>
            New Array
          </button>
          <button className="text-red-500" onClick={reset}>
            Reset
          </button>
        </section>
      </div>

      <div className="flex   rounded  justify-center items-center  gap-3 text-[#4F4F4F]">
        {isSorting ? (
          <button className="px-4 py-1 border  bg-white   rounded-xl" disabled>
            Sort
          </button>
        ) : (
          <button
            className="px-4 py-1 border tracking-wide font-semibold  bg-white   rounded-xl"
            onClick={() => {
              handleSort();
              setIsSorting(true);
            }}
          >
            Sort
          </button>
        )}
      </div>
    </div>
  );
}
