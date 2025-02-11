"use strict";
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
exports.getTitle = exports.updateProfileDB = exports.updateProfileData = void 0;
var axios_1 = require("axios");
var node_cron_1 = require("node-cron");
var recurring_logic_1 = require("./recurring-logic");
node_cron_1.default.schedule("59 23 28-31 * *", function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, lastDay;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                if (!(today.getDate() === lastDay)) return [3 /*break*/, 2];
                console.log("Running fetchAllUsers at month-end...");
                return [4 /*yield*/, fetchAllUsers()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
var fetchAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, userIds, _i, userIds_1, userId, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, axios_1.default.get("".concat(recurring_logic_1.BASE_URL, ".json"))];
            case 1:
                response = _a.sent();
                userIds = Object.keys(response.data);
                _i = 0, userIds_1 = userIds;
                _a.label = 2;
            case 2:
                if (!(_i < userIds_1.length)) return [3 /*break*/, 5];
                userId = userIds_1[_i];
                return [4 /*yield*/, processData(userId)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var processData = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var expenses, profile, budget, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fetchData(userId, "expenses")];
            case 1:
                expenses = _a.sent();
                if (expenses.length === 0)
                    return [2 /*return*/]; // Return if no expenses present
                return [4 /*yield*/, fetchData(userId, "profile")];
            case 2:
                profile = _a.sent();
                return [4 /*yield*/, fetchData(userId, "budget")];
            case 3:
                budget = _a.sent();
                (0, exports.updateProfileData)(profile, expenses, budget, userId);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var fetchData = function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(recurring_logic_1.BASE_URL, "/").concat(userId, "/").concat(data, ".json"))];
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
var updateProfileData = function (profileData, expenses, budgets, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var maxXp, xp, level, newXp, newLevel, newMaxXp, categoriesTotal, _i, budgets_1, budget, _a, _b, _c, category, total;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                maxXp = profileData.maxXp, xp = profileData.xp, level = profileData.level;
                newXp = xp;
                newLevel = level;
                newMaxXp = maxXp;
                categoriesTotal = calculateCategoryTotals(expenses);
                _i = 0, budgets_1 = budgets;
                _e.label = 1;
            case 1:
                if (!(_i < budgets_1.length)) return [3 /*break*/, 6];
                budget = budgets_1[_i];
                _a = 0, _b = Object.entries(categoriesTotal);
                _e.label = 2;
            case 2:
                if (!(_a < _b.length)) return [3 /*break*/, 5];
                _c = _b[_a], category = _c[0], total = _c[1];
                if (!(budget.category === category)) return [3 /*break*/, 4];
                (_d = processXpChange(newXp, newLevel, newMaxXp, total, budget.budget), newXp = _d.newXp, newLevel = _d.newLevel, newMaxXp = _d.newMaxXp);
                // Await database update before moving to the next budget
                return [4 /*yield*/, (0, exports.updateProfileDB)(userId, {
                        maxXp: newMaxXp,
                        xp: newXp,
                        title: (0, exports.getTitle)(newLevel),
                        level: newLevel,
                    })];
            case 3:
                // Await database update before moving to the next budget
                _e.sent();
                _e.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateProfileData = updateProfileData;
// Function to calculate total amount spent per category
var calculateCategoryTotals = function (expenses) {
    return expenses.reduce(function (acc, expense) {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});
};
// Function to process XP changes based on budget comparison
var processXpChange = function (xp, level, maxXp, totalSpent, budgetLimit) {
    var newXp = xp;
    var newLevel = level;
    var newMaxXp = maxXp;
    var xpChange = 0;
    if (totalSpent <= budgetLimit) {
        xpChange = (budgetLimit - totalSpent) / 100;
        newXp += xpChange;
        // Level up if XP exceeds max XP
        if (newXp >= newMaxXp) {
            var exceedingXp = newXp - newMaxXp;
            newXp = exceedingXp;
            newLevel++;
            newMaxXp += 500; // Increase max XP per level
        }
    }
    else {
        xpChange = (totalSpent - budgetLimit) / 100;
        newXp -= xpChange;
        // Level down if XP goes negative
        if (newXp < 0 && newLevel > 1) {
            newMaxXp -= 500;
            newLevel--;
            newXp += newMaxXp;
        }
        newXp = Math.max(newXp, 0); // Prevent XP from going negative
    }
    return { newXp: newXp, newLevel: newLevel, newMaxXp: newMaxXp };
};
// Updates the database
var updateProfileDB = function (userId, profileData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.put("".concat(recurring_logic_1.BASE_URL, "/").concat(userId, "/profile"), profileData)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateProfileDB = updateProfileDB;
// Function to get title based on level
var getTitle = function (level) {
    var titles = ["Beginner", "Novice", "Apprentice", "Expert", "Master"];
    return titles[Math.min(level - 1, titles.length - 1)]; // Prevents index out of range
};
exports.getTitle = getTitle;
