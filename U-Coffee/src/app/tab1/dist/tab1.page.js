"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.Tab1Page = void 0;
var core_1 = require("@angular/core");
var Tab1Page = /** @class */ (function () {
    function Tab1Page(actRouter, http, router, alertCtrl) {
        this.actRouter = actRouter;
        this.http = http;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.varUser = "";
        this.titulo = "Ingreso";
        this.varHistorial = [];
        this.correo = "";
        this.contra = "";
    }
    Tab1Page.prototype.alert = function (header, subHeader, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            subHeader: subHeader,
                            message: subHeader,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.hidden = function (bool1, bool2, bool3, bool4) {
        document.getElementById("no-info").hidden = bool1;
        document.getElementById("titulo").hidden = bool2;
        document.getElementById("log-in").hidden = bool3;
        document.getElementById("historial").hidden = bool4;
    };
    Tab1Page.prototype.logIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datosDB;
            var _this = this;
            return __generator(this, function (_a) {
                if ((this.correo == "") || (this.contra == "")) {
                    this.alert('Alerta', 'Campos vacios', 'Debe rellenar todos los campos');
                }
                else {
                    datosDB = { "correo": this.correo, "contra": this.contra };
                    this.http.post('https://localhost/u-coffee/ingreso.php', JSON.stringify(datosDB)).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var datosDB_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            console.log(res);
                            if (res == '1') {
                                this.varUser = this.correo;
                                if ((this.varUser != null) || (this.varUser != "")) {
                                    this.titulo = "Mis pedidos";
                                    this.loadUser();
                                    datosDB_1 = {
                                        "user": this.varUser
                                    };
                                    this.http.post('https://localhost/u-coffee/historial.php', JSON.stringify(datosDB_1)).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.varHistorial = res;
                                            console.log(this.varHistorial);
                                            if (this.varHistorial.lenght == 0) {
                                                this.hidden(false, false, true, true);
                                            }
                                            else {
                                                this.hidden(true, false, true, false);
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); });
                                    console.log(this.varUser);
                                    this.router.navigate(['/tabs/tab2', this.varUser]);
                                }
                                else {
                                    this.hidden(true, true, false, true);
                                    this.titulo = "Ingreso";
                                }
                            }
                            else {
                                this.alert('Alerta', 'Error de ingreso', 'El campo de <strong>Documento</strong> y/o <strong>Contraseña</strong> es incorrecto');
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    Tab1Page.prototype.enviar = function () {
        this.router.navigate(['/tabs/tab2', this.varUser]);
    };
    Tab1Page.prototype.loadUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datosDB;
            var _this = this;
            return __generator(this, function (_a) {
                datosDB = {
                    "mail": this.varUser
                };
                this.http.post('http://localhost/u-coffee/user.php', JSON.stringify(datosDB)).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.datos = res;
                        console.log(this.datos);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Tab1Page.prototype.ngOnInit = function () {
    };
    Tab1Page = __decorate([
        core_1.Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        })
    ], Tab1Page);
    return Tab1Page;
}());
exports.Tab1Page = Tab1Page;
