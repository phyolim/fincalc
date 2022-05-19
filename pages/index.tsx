/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, MailIcon, ScaleIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CurrencyFormat } from "../src/components/CurrencyFormat";
import { classNames } from "../src/util";

const ESA_MIN_INCOME = { single: 95000, married: 190000 };
const ESA_MAX_INCOME = { single: 110000, married: 220000 };
const MAX_CONTRIBUTION_AMOUNT = 2000;
const RANGE = {
  single: ESA_MAX_INCOME.single - ESA_MIN_INCOME.single,
  married: ESA_MAX_INCOME.married - ESA_MIN_INCOME.married,
};
const SUBTRACT_CONSTANT = {
  single: MAX_CONTRIBUTION_AMOUNT / RANGE.single,
  married: MAX_CONTRIBUTION_AMOUNT / RANGE.married,
};
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const calculateContributionAllowed = (filingStatus: "single" | "married", magi: number) => {
  if (magi < ESA_MIN_INCOME[filingStatus]) {
    return MAX_CONTRIBUTION_AMOUNT;
  } else if (magi > ESA_MAX_INCOME[filingStatus]) {
    return 0;
  }

  console.log("CALCULATING CONTRIBUTION ALLOWED");
  const overIncomeThreshold = magi - ESA_MIN_INCOME[filingStatus];

  console.log(
    "overIncomeThreshold",
    overIncomeThreshold,
    SUBTRACT_CONSTANT[filingStatus],
    overIncomeThreshold * SUBTRACT_CONSTANT[filingStatus],
    MAX_CONTRIBUTION_AMOUNT - overIncomeThreshold * SUBTRACT_CONSTANT[filingStatus]
  );

  return MAX_CONTRIBUTION_AMOUNT - overIncomeThreshold * SUBTRACT_CONSTANT[filingStatus];
};

export default function Example() {
  const [contributionAllowed, setContributionAllowed] = useState(0);

  const defaultValues = {
    filingStatus: "single",
    magi: 0,
  };

  const { register, handleSubmit, watch, control } = useForm({ defaultValues });

  const watchFields = watch();

  useEffect(() => {
    setContributionAllowed(calculateContributionAllowed(watchFields.filingStatus, watchFields.magi));
  }, [watchFields.filingStatus, watchFields.magi]);

  const onSubmit = (v: any) => {
    console.log(v);
  };
  return (
    <div className="bg-gray-50 lg:py-24 min-h-screen py-16 overflow-hidden">
      <div className="sm:px-6 lg:px-8 lg:max-w-7xl relative max-w-xl px-4 mx-auto">
        <svg
          className="lg:block left-full -translate-y-1/4 absolute hidden transform -translate-x-1/2"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div className="relative">
          <h2 className="sm:text-4xl text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900">
            2021-2022 ESA Contribution Calculator
          </h2>
        </div>

        <div className="lg:mt-18 lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center relative mt-12">
          <div className="lg:mt-0 relative mt-10 -mx-4" aria-hidden="true">
            <svg
              className="left-1/2 lg:hidden absolute transform -translate-x-1/2 translate-y-16"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            {/* Payment details */}
            <div className="sm:px-6 lg:px-0 lg:max-w-3xl lg:col-span-9 relative m-auto space-y-6">
              <section aria-labelledby="payment-details-heading">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="sm:rounded-md sm:overflow-hidden shadow">
                    <div className="sm:p-6 px-4 py-6 bg-white">
                      <div>
                        <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                          ESA Contribution Calculator
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Select your filing status and enter your modified adjusted gross income (MAGI) and click
                          Calculate to get the Education Savings Account contribution amount.
                        </p>
                      </div>

                      <div className="grid grid-cols-4 gap-6 mt-6">
                        <div className="sm:col-span-2 col-span-4">
                          <label
                            htmlFor="filingStatus"
                            className="sm:mt-px sm:pt-2 block text-sm font-medium text-gray-700"
                          >
                            Filing Status
                          </label>
                          <div className="sm:mt-0 sm:col-span-2 mt-1">
                            <select
                              {...register("filingStatus")}
                              id="filingStatus"
                              name="filingStatus"
                              autoComplete="off"
                              className="focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="single">Single</option>
                              <option value="married">Married Filing Jointly</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-2 col-span-4">
                          <label htmlFor="magi" className="sm:mt-px sm:pt-2 block text-sm font-medium text-gray-700">
                            MAGI - modified adjusted gross income
                          </label>
                          <Controller
                            name="magi"
                            control={control}
                            render={({ field }: { field: any }) => (
                              <CurrencyFormat
                                {...field}
                                className="focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                              />
                            )}
                          />
                        </div>

                        <dl className="gap-x-4 gap-y-8 sm:grid-cols-2 grid grid-cols-1 col-span-4">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">ESA min income</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {formatter.format(
                                watchFields.filingStatus === "single" ? ESA_MIN_INCOME.single : ESA_MIN_INCOME.married
                              )}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">ESA max income</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {formatter.format(
                                watchFields.filingStatus === "single" ? ESA_MAX_INCOME.single : ESA_MAX_INCOME.married
                              )}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Max contribution amount</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formatter.format(MAX_CONTRIBUTION_AMOUNT)}</dd>
                          </div>
                        </dl>

                        <dl className="md:divide-y-0 md:divide-x md: grid grid-cols-1 col-span-2 col-span-4 mt-5 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow">
                          <div className="sm:p-6 px-4 py-5">
                            <dt className="text-base font-normal text-gray-900">Contribution Allowed</dt>
                            <dd className="md:block lg:flex flex items-baseline justify-between mt-1">
                              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                {contributionAllowed ? formatter.format(contributionAllowed) : "Enter a value in MAGI"}
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    {/*<div className="bg-gray-50 sm:px-6 px-4 py-3 text-right">*/}
                    {/*  <button*/}
                    {/*    type="submit"*/}
                    {/*    className="hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm"*/}
                    {/*  >*/}
                    {/*    Calculate*/}
                    {/*  </button>*/}
                    {/*</div>*/}
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>

        <svg
          className="lg:block right-full absolute hidden transform translate-x-1/2 translate-y-12"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>
      </div>
    </div>
  );
}
enum FILING_STATUS {
  SINGLE,
  MARRIED,
}
