import FooterLinks from './footer-links';
import {
  selectAuthors,
  selectStateDashboard,
  getStateDashboardLinks,
  getAuthorsLinks,
} from './footer-slice';

import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const Footer = () => {
  const authors = useSelector(selectAuthors);
  const stateDashboard = useSelector(selectStateDashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorsLinks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStateDashboardLinks());
  }, [dispatch]);

  return (
    <div className="text-center">
      {authors ? (
        <div>
          <h2 className={'fs-45 font-weight-bold'}>Authors</h2>
          <FooterLinks data={authors}></FooterLinks>
        </div>
      ) : null}
      <br />
      {stateDashboard ? (
        <div className="pt-5 pb-10">
          <h2 className={'fs-45 font-weight-bold'}>
            State Dashboard References
          </h2>
          <FooterLinks data={stateDashboard}></FooterLinks>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
