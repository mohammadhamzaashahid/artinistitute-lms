export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },

  courses: {
    all: ["courses"],
    list: (params) => ["courses", "list", params],
    detail: (slug) => ["courses", "detail", slug],
  },

  lectures: {
    playback: (lectureId) => ["lectures", "playback", lectureId],
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
    sessionStatus: (sessionId) => ["payments", "session-status", sessionId],
  },

  books: {
    all: ["books"],
    list: (params) => ["books", "list", params],
    detail: (slug) => ["books", "detail", slug],
    audioPlayback: (bookId, audioFileId) => ["books", "audio-playback", bookId, audioFileId],
    myOrders: (params) => ["books", "my-orders", params],
    myOrderDetail: (orderId) => ["books", "my-order", orderId],
  },
};