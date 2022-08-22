const emailProcess = async (job) => {
  var delayInMilliseconds = 10000; //1 second

  setTimeout(function () {
    //your code to be executed after 1 second
  }, delayInMilliseconds);
  //   throw new Error("something went wrong");
  console.log(job.data);
};

module.exports = { emailProcess };
