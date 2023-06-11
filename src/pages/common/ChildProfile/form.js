export const detalilsColumn = [
  {
    title: "CHILD DETAILS",
    align: "center",
    className: "tableHeading",
    children: [
      {
        title: "DETAIL",
        dataIndex: "details",
        key: "details",
        className: "DetailsClass",
        width: "40%",
      },
      {
        title: "VALUE",
        dataIndex: "value",
        key: "value",
        className: "tableValues",
        width: "60%",
      },
    ],
  },
];

export const orphanageColumns = [
  {
    title: "ORPHANAGE DETAILS",
    align: "center",
    className: "tableHeading",
    children: [
      {
        title: "DETAIL",
        dataIndex: "details",
        key: "details",
        className: "DetailsClass",
        width: "40%",
      },
      {
        title: "VALUE",
        dataIndex: "value",
        key: "value",
        className: "tableValues",
        width: "60%",
      },
    ],
  },
];

export const createColumns = (name) => {
  return [
    {
      title: name,
      align: "center",
      className: "tableHeading",
      children: [
        {
          title: "DETAIL",
          dataIndex: "details",
          key: "details",
          className: "DetailsClass",
          width: "40%",
        },
        {
          title: "VALUE",
          dataIndex: "value",
          key: "value",
          className: "tableValues",
          width: "60%",
        },
      ],
    },
  ];
};

export const createRows = (details) => {
  const res = Object.entries(details).map(([key, val], i) => {
    return { key: i, details: key, value: val };
  });
  return res;
};
