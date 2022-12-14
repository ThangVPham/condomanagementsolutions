const MaintenanceRequest = require("../Models/maintenanceRequest");
const WorkOrder = require("../Models/workOrder");
const Apartment = require("../Models/apartmentUnit");
const Announcement = require("../Models/announcement");

const searchMaintenanceRequest = async (req, res) => {
  //console.log("searchMaintenanceRequest");
  const username = req.user.username;
  const usertype = req.user.userType;

  const searchField = req.body.searchInput;

  if (usertype === "Admin") {
    const allRequests = await MaintenanceRequest.find().sort({
      dateCreated: -1,
    });

    if (searchField.length === 0) {
      res.render("myrequest", {
        title: "My Requests",
        page: "myrequest",
        request: allRequests,
        usertype: usertype,
      });
      return;
    }

    const filteredItems = allRequests.filter((request) => {
      let item = {};
      for (let key in request) {
        if (
          key !== "dateCreated" &&
          String(request[key]).toLowerCase().includes(searchField.toLowerCase())
        ) {
          item = request;
        }
      }
      if (Object.keys(item).length > 0) {
        return item;
      }
      return;
    });

    res.render("myrequest", {
      title: "My Requests",
      page: "myrequest",
      request: filteredItems,
      usertype: usertype,
    });
  } else {
    const allRequests = await MaintenanceRequest.find({ user: username });

    if (searchField.length === 0) {
      res.render("myrequest", {
        title: "My Requests",
        page: "myrequest",
        request: allRequests,
        usertype: usertype,
      });
      return;
    }
    const filteredItems = allRequests.filter((request) => {
      let item = {};
      for (let key in request) {
        if (
          key !== "dateCreated" &&
          String(request[key]).toLowerCase().includes(searchField.toLowerCase())
        ) {
          item = request;
        }
      }
      if (Object.keys(item).length > 0) {
        return item;
      }
    });

    res.render("myrequest", {
      title: "My Requests",
      page: "myrequest",
      request: filteredItems,
      usertype: usertype,
    });
  }

  return;
};

const searchWorkOrder = async (req, res) => {
  const searchField = req.body.searchInput;
  const usertype = req.user.userType;
  const allWorkOrders = await WorkOrder.find().sort({ dateCreated: -1 });
  if (searchField.length === 0) {
    res.render("workOrder", {
      title: "Work Orders",
      page: "workOrder",
      workorder: allWorkOrders,
      usertype: usertype,
    });
    return;
  }

  const filteredItems = allWorkOrders.filter((workOrder) => {
    let item = {};
    for (let key in workOrder) {
      if (
        key !== "dateCreated" &&
        String(workOrder[key]).toLowerCase().includes(searchField.toLowerCase())
      ) {
        item = workOrder;
      }
    }
    if (Object.keys(item).length > 0) {
      return item;
    }
  });

  res.render("workOrder", {
    title: "Work Orders",
    page: "workOrder",
    workorder: filteredItems,
    usertype: usertype,
  });

  return;
};

const searchApartment = async (req, res) => {
  const searchField = req.body.searchInput;
  const usertype = req.user.userType;
  const allApartments = await Apartment.find().sort({ unitNumber: 1 });
  if (searchField.length === 0) {
    res.render("apartment", {
      title: "Apartments",
      page: "apartment",
      apartment: allApartments,
      usertype: usertype,
    });
    return;
  }

  const filteredItems = allApartments.filter((workOrder) => {
    let item = {};
    for (let key in workOrder) {
      if (
        key !== "dateCreated" &&
        String(workOrder[key]).toLowerCase().includes(searchField.toLowerCase())
      ) {
        item = workOrder;
      }
    }
    if (Object.keys(item).length > 0) {
      return item;
    }
  });

  res.render("apartment", {
    title: "Apartments",
    page: "apartment",
    apartment: filteredItems,
    usertype: usertype,
  });

  return;
};
const searchAnnouncement = async (req, res) => {
  const searchField = req.body.searchInput;
  const usertype = req.user.userType;
  const allAnnouncements = await Announcement.find().sort({ date: -1 });
  if (searchField.length === 0) {
    res.render("announcement", {
      title: "Announcement",
      page: "announcements",
      announcement: allAnnouncements,
      usertype: usertype,
    });
    return;
  }

  const filteredItems = allAnnouncements.filter((announcement) => {
    let item = {};
    for (let key in announcement) {
      if (
        key !== "dateCreated" &&
        String(announcement[key])
          .toLowerCase()
          .includes(searchField.toLowerCase())
      ) {
        item = announcement;
      }
    }
    if (Object.keys(item).length > 0) {
      return item;
    }
  });

  res.render("announcement", {
    title: "Announcement",
    page: "announcement",
    announcement: filteredItems,
    usertype: usertype,
  });

  return;
};

module.exports = {
  searchMaintenanceRequest,
  searchWorkOrder,
  searchApartment,
  searchAnnouncement,
};
