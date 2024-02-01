import React, { useEffect, useState } from "react";
import "./Stepper.css";
// import { TiTick } from "react-icons/ti";
const Stepper = ({status}) => {
  const steps = ["Processing", "Shipped", "On Transit", "Delivered"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
   const changeStatus=()=>{
    if(status==="Processing")
        setCurrentStep(1);
    else if(status==="Shipped")
        setCurrentStep(2);
    else if(status==="On Transit")
        setCurrentStep(3);
    else if(status==="Delivered")
        setCurrentStep(4);
   }
   changeStatus();
  }, [status]);

  return (
    <>
      <div className="flex-justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <i class="bi bi-check-lg" size={24}></i> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )} */}
    </>
  );
};

export default Stepper;

{/* <TiTick size={24} /> */}