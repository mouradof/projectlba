import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts, deleteProduct } from "../slices/productSlice"
import { logout } from "../slices/userSlice"
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ProductForm from "./ProductForm"
import { useNavigate } from "react-router-dom"

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector((state) => state.products.items)
    const productStatus = useSelector((state) => state.products.status)
    const error = useSelector((state) => state.products.error)
    const [open, setOpen] = React.useState(false)
    const [selectedProduct, setSelectedProduct] = React.useState(null)

    useEffect(() => {
        if (productStatus === "idle") {
            dispatch(fetchProducts())
        }
    }, [productStatus, dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }

    const handleOpen = (product) => {
        setSelectedProduct(product)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedProduct(null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    const toggleAvailable = (product) => {
        dispatch(updateProduct({ ...product, available: !product.available }))
    }

    let content

    if (productStatus === "loading") {
        content = <div>Loading...</div>
    } else if (productStatus === "succeeded") {
        content = (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Garantie (années)</TableCell>
                        <TableCell>Évaluation</TableCell>
                        <TableCell>Disponibilité</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.warranty_years}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => toggleAvailable(product)}
                                    style={{
                                        backgroundColor: product.available ? "green" : "red",
                                        color: "white"
                                    }}
                                >
                                    {product.available ? "Disponible" : "Non disponible"}
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpen(product)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(product._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    } else if (productStatus === "failed") {
        content = <div>{error}</div>
    }

    return (
        <div style={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto", flexGrow: 1 }}>
                    <List>
                        {["Dashboard", "Inventaire"].map((text) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<ExitToAppIcon />}
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Button>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Articles
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <div style={{ padding: "24px" }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen(null)} style={{ marginBottom: "16px" }}>
                        Nouvel Article
                    </Button>
                    {content}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{selectedProduct ? "Modifier Article" : "Nouvel Article"}</DialogTitle>
                        <DialogContent>
                            <ProductForm product={selectedProduct} onClose={handleClose} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </div>
    )
}

export default ProductList
