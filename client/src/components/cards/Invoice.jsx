import React from 'react'
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { Table, TableBody, TableCell, TableHeader, DataTableCell } from '@david.kucsai/react-pdf-table'

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4',
        padding: '30px'
    },
    date: {
        color: 'gray',
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 50
    },
    tableHeader: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    additional: {
        marginTop: 30
    },
    footer: {
        marginTop: 70,
        textAlign: 'center',
        color: 'gray'
    }
});

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.date}>~ {new Date(order.paymentIntent.created).toLocaleString()} ~</Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.subtitle}>React Redux Ecommerce</Text>
                <Text style={styles.tableHeader}>Order Summary</Text>

                <Table>
                    <TableHeader>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Color</TableCell>
                    </TableHeader>
                </Table>
                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={p => p.product.title} />
                        <DataTableCell getContent={p => p.product.price} />
                        <DataTableCell getContent={p => p.count} />
                        <DataTableCell getContent={p => p.product.brand} />
                        <DataTableCell getContent={p => p.product.color} />
                    </TableBody>
                </Table>

                <View style={styles.additional}>
                    <Text>Date: {'             '} {new Date(order.paymentIntent.created * 1000).toLocaleString()}</Text>
                    <Text>Order Id: {'        '} {order.paymentIntent.id}</Text>
                    <Text>Order Status: {'  '} {order.orderStatus}</Text>
                    <Text>Total Paid: {'       '} {`$${order.paymentIntent.amount / 100}`}</Text>
                </View>

                <Text style={styles.footer}>~ Thank you for shopping! ~</Text>
            </Page>
        </Document>
    )
}

export default Invoice
