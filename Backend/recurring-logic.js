"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = void 0;
var profile_logic_1 = require("./profile-logic");
var axios_1 = require("axios");
var node_cron_1 = require("node-cron");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.BASE_URL = process.env.FIREBASE_URL;
var fetchAllUsers = function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var response, userIds, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(exports.BASE_URL, ".json"))];
            case 1:
                response = _a.sent();
                userIds = Object.keys(response.data);
                userIds.forEach(function (userId) {
                    handleRecurringIncome(userId, category);
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var handleRecurringIncome = function (userId, category) { return __awaiter(void 0, void 0, void 0, function () {
    var entries, uidArray, now, dueDate, indexForNewEntry, index, entry, todaysDate, recurDate, updatedNextDueDate, formattedDate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData(userId, category)];
            case 1:
                entries = _a.sent();
                if (!entries)
                    return [2 /*return*/];
                uidArray = [];
                now = 0;
                dueDate = 0;
                indexForNewEntry = entries.length - 1;
                index = 0;
                _a.label = 2;
            case 2:
                if (!(index < entries.length)) return [3 /*break*/, 6];
                entry = entries[index];
                if (!entry)
                    return [3 /*break*/, 5]; // Skip if entry is null
                if (entry.recurringInterval === "")
                    return [3 /*break*/, 5];
                todaysDate = new Date();
                recurDate = new Date(entry.nextDueDate);
                switch (entry.recurringInterval) {
                    case "Daily":
                    case "Weekly":
                        now = todaysDate.getDate();
                        dueDate = recurDate.getDate();
                        indexForNewEntry++;
                        break;
                    case "Monthly":
                        now = todaysDate.getMonth() + 1;
                        dueDate = recurDate.getMonth() + 1;
                        indexForNewEntry++;
                        break;
                }
                if (!(now >= dueDate)) return [3 /*break*/, 5];
                if (uidArray.includes(entry.uid))
                    return [2 /*return*/];
                uidArray.push(entry.uid);
                updatedNextDueDate = getNextDueDate(entry.nextDueDate, entry.recurringInterval);
                return [4 /*yield*/, updateEntry(userId, index, __assign(__assign({}, entry), { nextDueDate: updatedNextDueDate }), category)];
            case 3:
                _a.sent();
                formattedDate = getFormattedDate();
                return [4 /*yield*/, addNewEntry(userId, indexForNewEntry, __assign(__assign({}, entry), { date: {
                            date: formattedDate.date,
                            day: formattedDate.day,
                            month: formattedDate.month,
                        }, nextDueDate: updatedNextDueDate }), category)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                index++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/];
        }
    });
}); };
var fetchData = function (userId, category) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(exports.BASE_URL, "/").concat(userId, "/").concat(category, ".json"))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching:", error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateEntry = function (userId, index, data, category) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.patch("".concat(exports.BASE_URL, "/").concat(userId, "/").concat(category, "/").concat(index, ".json"), data)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error updating entry:", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addNewEntry = function (userId, index, data, category) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, axios_1.default.put("".concat(exports.BASE_URL, "/").concat(userId, "/").concat(category, "/").concat(index, ".json"), data)];
            case 1:
                _a.sent();
                if (!(category === "income")) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchData(userId, "profile")];
            case 2:
                profile = _a.sent();
                return [4 /*yield*/, updateProfileOnAddIncome(userId, profile, data.amount)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.error("Error adding new entry:", error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var handleExceedingDate = function (addedDate, month) {
    var exceedingDate = 0;
    for (var i = 0; i < parseInt(addedDate); i++) {
        if (i > 29) {
            exceedingDate++;
        }
    }
    var updatedDate = exceedingDate.toString();
    var updatedMonth = "";
    switch (month) {
        case "01":
            updatedMonth = "02";
            break;
        case "02":
            updatedMonth = "03";
            break;
        case "03":
            updatedMonth = "04";
            break;
        case "04":
            updatedMonth = "05";
            break;
        case "05":
            updatedMonth = "06";
            break;
        case "06":
            updatedMonth = "07";
            break;
        case "07":
            updatedMonth = "08";
            break;
        case "08":
            updatedMonth = "09";
            break;
        case "09":
            updatedMonth = "10";
            break;
        case "10":
            updatedMonth = "11";
            break;
        case "11":
            updatedMonth = "12";
            break;
        case "12":
            updatedMonth = "01"; // Reset to January
            break;
        default:
            console.log("Invalid month");
    }
    return { updatedDate: updatedDate, updatedMonth: updatedMonth };
};
var getNextDueDate = function (currentDate, interval) {
    var _a = currentDate.split("-"), month = _a[1], date = _a[2];
    switch (interval) {
        case "Daily":
            date = (parseInt(date) + 1).toString();
            // Change date and month if exceeds above 30
            if (parseInt(date) > 30) {
                var _b = handleExceedingDate(date, month), updatedDate = _b.updatedDate, updatedMonth = _b.updatedMonth;
                date = updatedDate;
                month = updatedMonth;
            }
            return "2025-".concat(month, "-").concat(date.padStart(2, "0"));
        case "Weekly":
            date = (parseInt(date) + 7).toString();
            // Change date and month if exceeds above 30
            if (parseInt(date) > 30) {
                var _c = handleExceedingDate(date, month), updatedDate = _c.updatedDate, updatedMonth = _c.updatedMonth;
                date = updatedDate;
                month = updatedMonth;
            }
            return "2025-".concat(month, "-").concat(date.padStart(2, "0"));
        case "Monthly":
            month = (parseInt(month) + 1).toString().padStart(2, "0");
            return "2025-".concat(month, "-").concat(date);
        default:
            return currentDate;
    }
};
var getFormattedDate = function (inputDate) {
    if (inputDate === void 0) { inputDate = new Date(); }
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var date = inputDate.getDate();
    var day = days[inputDate.getDay()];
    var month = months[inputDate.getMonth()];
    return { date: date, day: day, month: month };
};
node_cron_1.default.schedule("0 0 * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Running recurring handler...");
                return [4 /*yield*/, fetchAllUsers("expenses")];
            case 1:
                _a.sent();
                return [4 /*yield*/, fetchAllUsers("income")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// UPdates the profile data in DB when recurring income is added
var updateProfileOnAddIncome = function (userId, profileData, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var maxXp, xp, level, newXp, newLevel, newMaxXp, xpChange, exceedingXp, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maxXp = profileData.maxXp, xp = profileData.xp, level = profileData.level;
                newXp = xp;
                newLevel = level;
                newMaxXp = maxXp;
                xpChange = amount / 20;
                newXp += xpChange;
                if (newXp >= newMaxXp) {
                    exceedingXp = 0;
                    // Calculate how much the xp is exceeding above the maxXp to transfer it to the next level
                    for (i = newMaxXp; i < newXp; i++) {
                        exceedingXp++;
                    }
                    newXp = exceedingXp;
                    newLevel++;
                    newMaxXp += 500; // Increase max XP per level
                }
                return [4 /*yield*/, (0, profile_logic_1.updateProfileDB)(userId, {
                        maxXp: newMaxXp,
                        xp: newXp,
                        title: (0, profile_logic_1.getTitle)(newLevel),
                        level: newLevel,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
