import React from 'react'
import { Layout } from '../components/Layout'

export const ColophonePage = () => (
  <>
    <h2>Made With Gatsby</h2>
    <h2># Spelling & Grammar Errors </h2>
    <p>Send me a pull request fixing them.</p>
  </>
)

const ColophoneIndexPage = () => (
  <Layout>
    <ColophonePage />
  </Layout>
)

export default ColophoneIndexPage
