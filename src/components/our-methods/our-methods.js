import React from 'react';

const OurMethods = () => {
  return (
    <div className=" text-center bg-light pt-4">
      <h2 className={'fs-45 font-weight-bold'}>Our Methods</h2>
      <div className="text-left">
        <h5 className="fs-24">
          How available is U.S. state COVID-19 data? This dashboard visualizes
          data collected from Department of Public Health websites to determine
          the extent to which actionable COVID-19 data is publicly accessible
          and to demonstrate where states can show further improvement. Through
          an iterative and collaborative process, we designed a crowdsourced
          state dashboard data collection process, a weighted grading schema,
          and a collection of visualizations to represent our findings.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">Data Collection</h3>
        <h5 className="fs-24">
          To streamline data collection, we recruited BroadStreet COVID-19 Data
          Project policy team members to research and review state dashboards
          from August 20 through September 25. Data were collected during a
          series of data bursts using Google Sheets, and team members were
          provided with instructions to follow, links to state websites, and
          variable definitions to standardize the process. This crowdsourced
          approach enabled faster, more efficient data collection.{' '}
          <span className="text-primary">Download our data.</span>
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">
          Calculating & Visualizing State Grades
        </h3>
        <h5 className="fs-24">
          State grades are calculated across 71 variables using a weighted
          average formula refined by epidemiologists and experts in the fields
          of healthcare and medicine. Empirical scores out of 100 are tabulated
          based on the weighted formula and are then converted into letter
          grades and subgrades. Below are visualizations of the weighted formula
          and the distribution of total grades and subgrades across 50 U.S.
          states after scores were calculated.
        </h5>
        <div className="py-5">
          <img
            className="w-100"
            src="./assets/images/visual-formula.svg"
            alt="Visual Formula"
          />
        </div>
        <div className="py-5">
          <img className="w-100" src="https://dummyimage.com/600x400/000/fff" />
        </div>
        <h3 className="fs-34 font-weight-bold pt-5">State-Level</h3>
        <h5 className="fs-24">
          State-level COVID-19 data on cases, testing, and deaths enable a
          stronger understanding of the impact of SARS-CoV-2 by providing an
          overview of incidence, prevalence, and deaths within a state These
          data can he1p governments and policymakers respond more effectively to
          the spread of the virus.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">County-Level</h3>
        <h5 className="fs-24">
          County-level COVID-19 data on cases, testing, and deaths offer
          insights into how SARS-CoV-2 spreads within local communities, leading
          to more efficient response measures and resource allocation Local
          governments can leverage these data to respond more effectively and
          inform and empower their communities.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">Demographics</h3>
        <h5 className="fs-24">
          Understanding which populations are adversely impacted by COVID-19
          highlights critical disparities in reporting and risk factors between
          demographic groups Collecting demographic information may also help to
          identify gaps in data definitions and categorizations in relation to
          census data standards. These data can inform policy responses on which
          populations need immediate care, where to provide testing clinics. and
          the overall scope of a shutdown.{' '}
          <span className="text-primary"> Learn more about demographics.</span>
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">Special Populations</h3>
        <h5 className="fs-24">
          COVID-19 experiences ol vulnerable populations such as health care
          workers. incarcerated people. and nursing home residents require
          special attention These populations experience the COVID-19 impact at
          the frontlines and face a considerable level of risk Gathering data on
          special populations enables policy action and prevention strategies in
          response to the disparities identified within these populations.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">
          Exposure and Clinical Indications
        </h3>
        <h5 className="fs-24">
          Data on cases by exposure, signs and symptoms, and underlying health
          conditions help epidemiologists, public health professions, and
          healthcare workers to better understand the spread and behavior of the
          virus.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">
          Outcomes and Preparedness
        </h3>
        <h5 className="fs-24">
          Updated hospitalization and ICU data generate real time insights
          regarding the severity of COVID-19 outcomes, including increases in
          hospital capacity, infection fatality rate, or preventable deaths
          These data help officials to properly plan for COVID-19 surges and to
          manage public safety expectations.
        </h5>
        <h3 className="fs-34 font-weight-bold pt-5">Data Quality</h3>
        <h5 className="fs-24">
          States must provide accurate, relevant. and consistent data on public
          COVID-19 dashboards to set high standards for reporting methods and
          reliable comparisons.{' '}
          <span className="text-primary">
            Learn more about &quot;good data&quot;
          </span>
        </h5>
      </div>
    </div>
  );
};

export default OurMethods;
