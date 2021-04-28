# backdrop-server
A url shortener service built with graphql

## How to Use

Access the site at https://bkdrp.herokuapp.com.

If you have a URL to shorten, go to the Graphql playground at https://bkdrp.herokuapp.com/graphql,
create a mutation as seen in the code block below, and add your desired Url at the point indicated. 

Run the mutation.

Return to https://bkdrp.herokuapp.com and click on the shortened Url that represents your site.

(You may have to refresh the page if you don't see your shortened site) Enjoy!!

```
mutation {
  shortenUrl(longUrl:"---your-long-url---") {
      urlCode
      longUrl
      shortUrl
      date
  }
}

```




### Built with

GraphQL, Apollo-server-express, Express.
