import {type QuestionResponse } from "./questions";

const generateSampleData = (): QuestionResponse[] => {
    const sampleQuestions: QuestionResponse[] = [];
  
    for (let i = 1; i <= 100; i++) {
      sampleQuestions.push({
        ID: `Q${i}`,
        Description: `Description for question ${i}. This question involves understanding the problem and providing a solution.`,
        Title: `Sample Question ${i}`,
        InputFormat: [`Input format for question ${i}.`],
        Points: Math.floor(Math.random() * 20) + 1, // Random points between 1 and 20
        Round: Math.floor(Math.random() * 3) + 1, // Random round between 1 and 3
        Constraints: [
          `Constraint 1 for question ${i}`,
          `Constraint 2 for question ${i}`,
        ],
        OutputFormat: [`Output format for question ${i}.`],
        SampleTestInput: [`Sample input for question ${i}.`],
        SampleTestOutput: [`Expected output for question ${i}.`],
        Explanation: [
          `Explanation for the solution of question ${i}.`
        ],
      });
    }
  
    return sampleQuestions;
  };

export {generateSampleData};