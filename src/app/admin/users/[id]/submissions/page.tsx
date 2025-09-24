"use client";

import {
  getUserSubmissions,
  type SubmissionWithResultsAndTestcases,
  type UserWithSubmissions,
} from "@/api/submissions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserSubmissionsPage = () => {
  const params = useParams();
  const userID = params?.id as string;

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery<UserWithSubmissions, Error>({
    queryKey: ["user-submissions", userID],
    queryFn: () => getUserSubmissions(userID),
    enabled: !!userID,
  });

  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionWithResultsAndTestcases | null>(null);
  const [selectedTestcaseIndex, setSelectedTestcaseIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  // Set the first submission and question as selected by default when data loads
  useEffect(() => {
    if (userData?.submissions && userData.submissions.length > 0) {
      const firstSubmission = userData.submissions[0];
      setSelectedSubmission(firstSubmission);
      setSelectedQuestion(firstSubmission.submission.QuestionID);
      setSelectedTestcaseIndex(0);
    }
  }, [userData]);

  // Update selected test case when submission or question changes
  useEffect(() => {
    setSelectedTestcaseIndex(0);
  }, [selectedSubmission, selectedQuestion]);

  if (isLoading) return <div className="p-4 text-white">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!userData) return <div className="p-4 text-white">No data</div>;

  const { user, submissions } = userData;

  // Filter submissions for the currently selected question
  const submissionsForSelectedQuestion = submissions.filter(
    (s) => s.submission.QuestionID === selectedQuestion,
  );

  const selectedTestcase = selectedSubmission?.results?.[selectedTestcaseIndex];

  const passedTestCasesCount =
    selectedSubmission?.submission.TestcasesPassed ?? 0;
  const totalTestCasesCount =
    (selectedSubmission?.submission.TestcasesPassed ?? 0) +
    (selectedSubmission?.submission.TestcasesFailed ?? 0);
  const totalPoints =
    selectedSubmission?.results?.reduce(
      (acc, r) => acc + (r.PointsAwarded ?? 0),
      0,
    ) ?? 0;
  const maxPossiblePoints = totalTestCasesCount * 10;

  // Get unique Question IDs to populate the dropdown
  const uniqueQuestionIDs = Array.from(
    new Set(submissions.map((s) => s.submission.QuestionID)),
  );

  return (
    <div className="flex min-h-screen flex-col bg-black p-6 text-white">
      {/* Header with User Info and Round/Question selector */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-900 p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold">{user.Name.toUpperCase()}</span>
            <span className="text-xs text-gray-500">Email: {user.Email}</span>
            <span className="text-xs text-gray-500">
              Register Number: {user.RegNo}
            </span>
            <span className="text-xs text-gray-500">
              Round: {user.RoundQualified}
            </span>
            <span className="text-xs text-gray-500">Score: {user.Score}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex h-[calc(100vh-10rem)] w-full gap-4">
        {/* Left Panel */}
        <div className="flex w-[25%] flex-col rounded-lg bg-gray-900 p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-bold">
            Points Earned: {totalPoints}/{maxPossiblePoints}
          </h3>
          <p className="mb-2 text-sm text-gray-400">
            Submissions for this question:
          </p>
          <ul className="flex-grow space-y-2 overflow-y-auto">
            {submissionsForSelectedQuestion.map((s, index) => (
              <li
                key={s.submission.ID}
                onClick={() => setSelectedSubmission(s)}
                className={`cursor-pointer rounded p-3 transition-colors duration-200 ${
                  selectedSubmission?.submission.ID === s.submission.ID
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    {index + 1}.{" "}
                    {new Date(s.submission.SubmissionTime).toLocaleTimeString()}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                      s.submission.TestcasesFailed === 0
                        ? "bg-green-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {s.submission.TestcasesPassed}/
                    {s.submission.TestcasesFailed +
                      s.submission.TestcasesPassed}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex w-[75%] flex-col rounded-lg bg-gray-900 p-4 shadow-lg">
          {/* Test Case Summary */}
          <div className="mb-4 flex items-center justify-between border-b border-gray-700 pb-2">
            <p className="text-lg font-bold">
              {passedTestCasesCount}/{totalTestCasesCount} Test Cases Passed
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-bold">ROUND 1</div>
              <div className="relative">
                <select
                  className="appearance-none rounded-md border border-gray-700 bg-gray-800 p-2 pr-8 text-white focus:outline-none"
                  value={selectedQuestion ?? ""}
                  onChange={(e) => {
                    const newQuestionID = e.target.value;
                    setSelectedQuestion(newQuestionID);
                    const firstSubmissionForNewQuestion = submissions.find(
                      (s) => s.submission.QuestionID === newQuestionID,
                    );
                    setSelectedSubmission(
                      firstSubmissionForNewQuestion ?? null,
                    );
                  }}
                >
                  {uniqueQuestionIDs.map((questionID, index) => (
                    <option key={questionID} value={questionID}>
                      QUESTION {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="font-bold">
              Compile Message:{" "}
              <span className="text-green-500">
                {selectedSubmission?.submission.Status === "Accepted"
                  ? "Success"
                  : selectedSubmission?.submission.Status}
              </span>
            </p>
          </div>

          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* Left Column (Test Case List) */}

            <div className="flex w-1/3 flex-col space-y-2 overflow-y-auto">
              {selectedSubmission?.results?.map((test, index) => (
                <div
                  key={test.ID}
                  onClick={() => setSelectedTestcaseIndex(index)}
                  className={`flex cursor-pointer items-center rounded-md border p-2 transition-colors duration-200 ${
                    selectedTestcaseIndex === index
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  } ${
                    test.Status === "Accepted"
                      ? "border-green-500 bg-green-500/10 text-green-500"
                      : "border-red-500 bg-red-500/10 text-red-500"
                  }`}
                >
                  <p className="font-bold">
                    TEST CASE {index + 1}{" "}
                    <span className="ml-2">
                      {test.Status === "Accepted" ? "✔" : "✖"}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column (Test Case Details and Source Code) */}
            <div className="flex w-2/3 flex-col space-y-4 overflow-y-auto">
              {/* Test Case Details (Input/Output/Expected) */}
              <div className="flex-1 rounded-md bg-gray-800 p-4 text-sm">
                <div>
                  <p className="font-bold">INPUT</p>
                  <pre className="mt-1 w-full overflow-x-auto rounded bg-gray-900 p-2 text-gray-300">
                    {selectedTestcase?.testcase?.Input ?? "No input data."}
                  </pre>
                </div>
                <div>
                  <p className="font-bold">OUTPUT</p>
                  <pre className="mt-1 w-full overflow-x-auto rounded bg-gray-900 p-2 text-gray-300">
                    {/* The API does not provide a separate 'Output' from the user's program, so we'll display a placeholder or leave it empty. */}
                    {/* Assuming this field will be populated by your backend with the actual output of the user's code */}
                    {
                      "No user output data available in the current API response."
                    }
                  </pre>
                </div>
                <div>
                  <p className="font-bold">EXPECTED OUTPUT</p>
                  <pre className="mt-1 w-full overflow-x-auto rounded bg-gray-900 p-2 text-gray-300">
                    {selectedTestcase?.testcase?.ExpectedOutput ??
                      "No expected output data."}
                  </pre>
                </div>
              </div>

              {/* Source Code */}
              <div className="flex-1 rounded-md bg-gray-800 p-4 text-sm">
                <p className="font-bold">SOURCE CODE</p>
                <pre className="mt-1 w-full overflow-x-auto rounded bg-gray-900 p-2 text-gray-300">
                  {selectedSubmission?.submission.SourceCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubmissionsPage;
