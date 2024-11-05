import NukeIcon from '../assets/icons/nuke.png';
import MayaIcon from '../assets/icons/maya.png';
import OpenPypeIcon from '../assets/icons/openpype.png';
import AfterEffectsIcon from '../assets/icons/aftereffects.png';
import DefaultIcon from '../assets/icons/openpype.png'; // Default icon

const pluginIcons = {
    "Nuke": NukeIcon,
    "Maya": MayaIcon,
    "OpenPype": OpenPypeIcon,
    "AfterEffects": AfterEffectsIcon,
    "default": DefaultIcon
};

export const getPluginIcon = (pluginName, size = 24) => {
    const iconSrc = pluginIcons[pluginName] || pluginIcons["default"];
    return <img src={iconSrc} alt={pluginName} style={{ width: size, height: size }} />;
};