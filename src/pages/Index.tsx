import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentOrder, setCurrentOrder] = useState<any[]>([]);

  const addToOrder = (item: any) => {
    const existingItem = currentOrder.find(
      (orderItem) => orderItem.id === item.id,
    );
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        ),
      );
    } else {
      setCurrentOrder([
        ...currentOrder,
        {
          ...item,
          quantity: item.max - item.current,
          price: Math.floor(Math.random() * 1000) + 100,
        },
      ]);
    }
  };

  const removeFromOrder = (itemId: number) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return currentOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const inventoryData = [
    {
      id: 1,
      name: "Томаты",
      current: 45,
      min: 50,
      max: 100,
      status: "low",
      supplier: "Овощи+",
    },
    {
      id: 2,
      name: "Мука",
      current: 85,
      min: 30,
      max: 120,
      status: "ok",
      supplier: "Мука-Сервис",
    },
    {
      id: 3,
      name: "Курица",
      current: 25,
      min: 40,
      max: 80,
      status: "critical",
      supplier: "Мясо-Опт",
    },
    {
      id: 4,
      name: "Сыр",
      current: 65,
      min: 20,
      max: 70,
      status: "ok",
      supplier: "Молочный дом",
    },
    {
      id: 5,
      name: "Рис",
      current: 15,
      min: 25,
      max: 60,
      status: "low",
      supplier: "Крупы-Прямо",
    },
  ];

  const orders = [
    {
      id: 1,
      date: "2025-01-05",
      supplier: "Овощи+",
      items: 5,
      total: 15420,
      status: "sent",
    },
    {
      id: 2,
      date: "2025-01-03",
      supplier: "Мука-Сервис",
      items: 3,
      total: 8900,
      status: "delivered",
    },
    {
      id: 3,
      date: "2025-01-02",
      supplier: "Мясо-Опт",
      items: 7,
      total: 28500,
      status: "delivered",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "ok":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Критично";
      case "low":
        return "Низкий";
      case "ok":
        return "Норма";
      case "sent":
        return "Отправлен";
      case "delivered":
        return "Доставлен";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="ShoppingCart" size={28} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Автозаказ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Поиск..." className="w-64" />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Search" size={16} />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 bg-gray-50">
              <TabsTrigger
                value="dashboard"
                className="flex items-center space-x-2"
              >
                <Icon name="BarChart3" size={16} />
                <span>Главная</span>
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="flex items-center space-x-2"
              >
                <Icon name="Package" size={16} />
                <span>Склад</span>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="flex items-center space-x-2"
              >
                <Icon name="ClipboardList" size={16} />
                <span>Заказы</span>
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Создание заказа</span>
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="flex items-center space-x-2"
              >
                <Icon name="TrendingUp" size={16} />
                <span>Отчеты</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Всего позиций</p>
                      <p className="text-3xl font-bold text-gray-900">234</p>
                    </div>
                    <Icon name="Package" size={32} className="text-blue-600" />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Критичных остатков
                      </p>
                      <p className="text-3xl font-bold text-red-600">12</p>
                    </div>
                    <Icon
                      name="AlertTriangle"
                      size={32}
                      className="text-red-600"
                    />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Активных заказов</p>
                      <p className="text-3xl font-bold text-blue-600">8</p>
                    </div>
                    <Icon name="Truck" size={32} className="text-blue-600" />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Экономия в месяц</p>
                      <p className="text-3xl font-bold text-green-600">
                        ₽45,200
                      </p>
                    </div>
                    <Icon
                      name="TrendingUp"
                      size={32}
                      className="text-green-600"
                    />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Критичные остатки
                  </h3>
                  <div className="space-y-4">
                    {inventoryData
                      .filter(
                        (item) =>
                          item.status === "critical" || item.status === "low",
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.supplier}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {item.current} / {item.max}
                            </p>
                            <Badge className={getStatusColor(item.status)}>
                              {getStatusText(item.status)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Последние заказы
                  </h3>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{order.supplier}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ₽{order.total.toLocaleString()}
                          </p>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Inventory */}
            <TabsContent value="inventory" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Управление складом
                </h2>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить остатки
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить позицию
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Текущий остаток</TableHead>
                      <TableHead>Мин. запас</TableHead>
                      <TableHead>Макс. запас</TableHead>
                      <TableHead>Поставщик</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.current}</TableCell>
                        <TableCell>{item.min}</TableCell>
                        <TableCell>{item.max}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusText(item.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="ShoppingCart" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  История заказов
                </h2>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтр
                  </Button>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ заказа</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Поставщик</TableHead>
                      <TableHead>Количество позиций</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id.toString().padStart(4, "0")}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>₽{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Download" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Create Order */}
            <TabsContent value="create" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Создание нового заказа
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Автоматические рекомендации
                    </h3>
                    <div className="space-y-4">
                      {inventoryData
                        .filter(
                          (item) =>
                            item.status === "critical" || item.status === "low",
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                Рекомендуется: {item.max - item.current} ед.
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => addToOrder(item)}
                            >
                              <Icon name="Plus" size={14} className="mr-1" />
                              Добавить
                            </Button>
                          </div>
                        ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Текущий заказ
                    </h3>
                    <div className="space-y-4">
                      {currentOrder.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Icon
                            name="ShoppingCart"
                            size={48}
                            className="mx-auto mb-2"
                          />
                          <p>Корзина пуста</p>
                          <p className="text-sm">
                            Добавьте товары из рекомендаций
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {currentOrder.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  {item.quantity} ед. × ₽{item.price}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  ₽
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromOrder(item.id)}
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-lg font-bold">
                            ₽{getTotalPrice().toLocaleString()}
                          </span>
                        </div>
                        <Button
                          className="w-full mt-4 bg-green-600 hover:bg-green-700"
                          disabled={currentOrder.length === 0}
                        >
                          <Icon name="Send" size={16} className="mr-2" />
                          Отправить заказ
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Reports */}
            <TabsContent value="reports" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Аналитика и отчеты
                </h2>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Период
                  </Button>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Экономия по поставщикам
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Овощи+</span>
                      <span className="font-medium text-green-600">
                        ₽12,400
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>Мука-Сервис</span>
                      <span className="font-medium text-green-600">₽8,900</span>
                    </div>
                    <Progress value={55} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>Мясо-Опт</span>
                      <span className="font-medium text-green-600">
                        ₽15,200
                      </span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Топ поставщиков
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "Мясо-Опт", orders: 24, amount: 156800 },
                      { name: "Овощи+", orders: 18, amount: 89400 },
                      { name: "Мука-Сервис", orders: 12, amount: 67200 },
                      { name: "Молочный дом", orders: 8, amount: 45600 },
                    ].map((supplier, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-sm text-gray-600">
                            {supplier.orders} заказов
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₽{supplier.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Динамика заказов</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Icon name="BarChart3" size={48} className="mx-auto mb-2" />
                    <p>График будет здесь</p>
                    <p className="text-sm">Визуализация данных о заказах</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  );
}
