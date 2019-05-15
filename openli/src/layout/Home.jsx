import React from 'react';
import Layout from './Layout';
import { rightItems } from './Layout';
import { leftItems } from './Layout';

const Home = () => {
  return <span />;
};

export default function HomeLayout() {
  return (
    <Layout leftItems={leftItems} rightItems={rightItems}>
      <Home />
    </Layout>
  );
}
