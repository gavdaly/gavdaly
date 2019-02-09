import React from 'react'
import { Layout } from '../components/Layout'

export const AboutPage = () => (
  <>
    <h2>Made With Gatsby</h2>
    <h2># Spelling & Grammar Errors </h2>
    <p>Send me a pull request fixing them.</p>
  </>
)

const AboutIndexPage = () => (
  <Layout>
    <AboutPage />
  </Layout>
)

export default AboutIndexPage
