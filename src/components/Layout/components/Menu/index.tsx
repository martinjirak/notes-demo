import { language } from 'constants/language'
import { Modal } from 'components/Modal'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MuiMenu from '@material-ui/core/Menu'
import React, { useCallback } from 'react'

export type MenuAction = 'openProfile' | 'openAbout' | 'switchLanguage'

interface MenuComponentProps {
    className?: string
}

export const Menu: React.FC<MenuComponentProps> = ({ className }) => {
    const { t, i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [isProfileVisible, setIsProfileVisible] = React.useState(false)
    const [isAboutAppVisible, setIsAboutAppVisible] = React.useState(false)

    const handleLanguageChange = useCallback(() => {
        if (i18n.language === language.en) {
            i18n.changeLanguage(language.cs)
        } else {
            i18n.changeLanguage(language.en)
        }
    }, [i18n])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMenuItemClick = (action: MenuAction) => {
        switch (action) {
            case 'openProfile':
                setIsProfileVisible(true)
                break
            case 'openAbout':
                setIsAboutAppVisible(true)
                break
            case 'switchLanguage':
                handleLanguageChange()
                break
        }
        handleClose()
    }

    const hadleProfileClose = () => {
        setIsProfileVisible(false)
        setIsAboutAppVisible(false)
    }

    const getModalBody = () => {
        if (isProfileVisible) {
            return <>{t('profile')}</>
        } else if (isAboutAppVisible) {
            return <>{t('about-app')}</>
        }
        return null
    }

    return (
        <>
            <IconButton
                edge="start"
                className={className}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <MuiMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleMenuItemClick('openProfile')}>
                    <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('openAbout')}>
                    <ListItemText primary="About" />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('switchLanguage')}>
                    <ListItemText primary={t('switch-language')} />
                </MenuItem>
            </MuiMenu>
            {(isProfileVisible || isAboutAppVisible) && (
                <Modal onClose={hadleProfileClose}>{getModalBody()}</Modal>
            )}
        </>
    )
}
