import Head from 'next/head'
import { AwesomeLink } from '../components/AwesomeLink'
import { links } from '../data/links'
import { gql, useQuery } from '@apollo/client'

const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
`

export default function Home() {
  const { data, error, loading } = useQuery(AllLinksQuery)

  if (loading) return <p>Loading ...</p>

  if (error) return <p>Oops, something went wrong {error.message}</p>

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.map((link) => (
            <AwesomeLink
              key={link.id}
              url={link.url}
              id={link.id}
              category={link.category}
              title={link.title}
              description={link.description}
              imageUrl={link.imageUrl}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
