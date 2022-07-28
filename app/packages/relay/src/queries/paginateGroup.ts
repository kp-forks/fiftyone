import { graphql } from "react-relay";

export default graphql`
  query paginateGroupQuery(
    $count: Int = 20
    $cursor: String = null
    $dataset: String!
    $view: BSONArray!
    $groupId: String!
    $pinnedSampleFilter: SampleFilter!
  ) {
    ...paginateGroup_query
    ...paginateGroupPinnedSample_query
  }
`;

export const paginateGroupPaginationFragment = graphql`
  fragment paginateGroup_query on Query
  @refetchable(queryName: "paginateGroupPageQuery") {
    samples(
      dataset: $dataset
      view: $view
      first: $count
      after: $cursor
      groupId: $groupId
    ) @connection(key: "paginateGroup_query_samples") {
      edges {
        cursor
        node {
          __typename
          ... on ImageSample {
            height
            sample
            width
          }
          ... on PointCloudSample {
            sample
          }
          ... on VideoSample {
            frameRate
            height
            sample
            width
          }
        }
      }
    }
  }
`;

export const paginateGroupPinnedSampleFragment = graphql`
  fragment paginateGroupPinnedSample_query on Query
  @refetchable(queryName: "paginateGroupPinnedSampleQuery") {
    sample(dataset: $dataset, view: $view, filter: $pinnedSampleFilter) {
      __typename
      ... on ImageSample {
        height
        sample
        width
      }
      ... on PointCloudSample {
        sample
      }
      ... on VideoSample {
        frameRate
        height
        sample
        width
      }
    }
  }
`;
