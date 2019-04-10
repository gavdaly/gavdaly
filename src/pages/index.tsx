import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'

export const IndexPage = () => (
  <>
    <hgroup>
      <h1>Hi, I'm Gavin Daly!</h1>
      <h2>but you can call me Gav</h2>
    </hgroup>

    <p />

    <p>
      I host the Art of Product Podcast, created Refactoring Rails, and Briefs. Currently, I'm
      building Tuple, a tool for remote pair programming. If you like programming advice, and
      behind-the-curtain info about running software businesses, you should sign up for my
      newsletter. You can also see what I'm doing now.
    </p>

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <p>
      <Link to="/all/">See content generated from Markdown files</Link>
    </p>
  </>
)

const LayoutIndexPage = () => (
  <Layout>
    <IndexPage />
  </Layout>
)

export default LayoutIndexPage
