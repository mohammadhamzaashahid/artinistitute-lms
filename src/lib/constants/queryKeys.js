export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },

  courses: {
    all: ["courses"],
    list: (params) => ["courses", "list", params],
    detail: (slug) => ["courses", "detail", slug],
  },

  categories: {
    all: ["categories"],
  },

  tags: {
    all: ["tags"],
  },

  payments: {
    myCourses: (params) => ["payments", "my-courses", params],
    mySubscriptions: (params) => ["payments", "my-subscriptions", params],
    myPurchases: (params) => ["payments", "my-purchases", params],
  },
};