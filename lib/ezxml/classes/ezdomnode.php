<?php
//
// Definition of eZDOMNode class
//
// Created on: <16-Nov-2001 12:11:43 bf>
//
// Copyright (C) 1999-2002 eZ systems as. All rights reserved.
//
// This source file is part of the eZ publish (tm) Open Source Content
// Management System.
//
// This file may be distributed and/or modified under the terms of the
// "GNU General Public License" version 2 as published by the Free
// Software Foundation and appearing in the file LICENSE.GPL included in
// the packaging of this file.
//
// Licencees holding valid "eZ publish professional licences" may use this
// file in accordance with the "eZ publish professional licence" Agreement
// provided with the Software.
//
// This file is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING
// THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE.
//
// The "eZ publish professional licence" is available at
// http://ez.no/home/licences/professional/. For pricing of this licence
// please contact us via e-mail to licence@ez.no. Further contact
// information is available at http://ez.no/home/contact/.
//
// The "GNU General Public License" (GPL) is available at
// http://www.gnu.org/copyleft/gpl.html.
//
// Contact licence@ez.no if any conditions of this licencing isn't clear to
// you.
//

/*! \file ezdomnode.php
  DOM node handling
*/

/*!
  \class eZDOMNode ezdomnode.php
  \ingroup eZXML
  \brief eZDOMNode handles DOM nodes in DOM documents

  Type of the DOM node can be: ElementNode=1, AttributeNode=2, TextNode=3, CDATASectionNode=4
  \sa eZXML eZDOMDocument
*/

class eZDOMNode
{
    /*!
      Creates a new DOM node.
    */
    function eZDOMNode( )
    {
    }

    /*!
      Returns the node name.
    */
    function name()
    {
        return $this->Name;
    }

    /*!
      Sets the nodes name.
    */
    function setName( $name )
    {
        $this->Name = $name;
        $this->LocalName = $name;
    }

    /*!
      Returns the nodes namespace URI.
    */
    function namespaceURI()
    {
        return $this->NamespaceURI;
    }

    /*!
      Sets the namespace URI
    */
    function setNamespaceURI( $uri )
    {
        $this->NamespaceURI = $uri;
    }

    /*!
      Returns the local name of the node if the node uses namespaces. If not false is returned.
    */
    function localName()
    {
        return $this->LocalName;
    }

    /*!
      Returns returns the namespace prefix
    */
    function prefix()
    {
        return $this->Prefix;
    }

    /*!
      Sets the namespace prefix for this element.
    */
    function setPrefix( $value )
    {
        $this->Prefix = $value;
    }

    /*!
      Returns the node type.
      Type of the DOM node can be: ElementNode=1, AttributeNode=2, TextNode=3, CDATASectionNode=4
    */
    function type()
    {
        return $this->Type;
    }

    /*!
      Sets the node type.
      Type of the DOM node can be: ElementNode=1, AttributeNode=2, TextNode=3, CDATASectionNode=4
    */
    function setType( $type )
    {
        $this->Type = $type;
    }

    /*!
      Returns the node content.
    */
    function &content()
    {
        return $this->Content;
    }

    /*!
      Sets the node content.
    */
    function setContent( $content )
    {
        $this->Content = $content;
    }

    /*!
      Returns the node attributes.
    */
    function attributes()
    {
        return $this->Attributes;
    }

    /*!
      Returns the node children.
    */
    function &children()
    {
        return $this->Children;
    }

    /*!
      Returns the attribute value for the given attribute.
      If no value is found false is returned.
    */
    function &attributeValue( $attributeName )
    {
        $ret = false;
        foreach ( $this->Attributes as $attribute )
        {
            if ( $attribute->name() == $attributeName )
                $ret = $attribute->content();
        }

        return $ret;
    }

    /*!
      Returns the attribute value for the given attribute name and namespace.
      If no value is found false is returned.
    */
    function &attributeValueNS( $attributeName, $namespaceURI )
    {
        $ret = false;
        if ( count( $this->Attributes  ) > 0 )
        foreach ( $this->Attributes as $attribute )
        {
            if ( ( $attribute->name() == $attributeName )
                 &&
                 ( $attribute->namespaceURI() == $namespaceURI )
                 )
            {

                $ret = $attribute->content();
            }
        }

        return $ret;
    }

    /*!
      Appends a child node to the current node.
    */
    function appendChild( &$node )
    {
        if ( get_class( $node ) == "ezdomnode" )
        {
            $this->Children[] =& $node;
        }
    }

    /*!
      Appends an attribute node.
    */
    function appendAttribute( &$node )
    {
        if ( get_class( $node ) == "ezdomnode" )
        {
            $this->Attributes[] =& $node;
        }
    }

    /*!
     Returns the contents of the node if it has one child which is a #text node.
     False is returned if unsuccessful.
    */
    function &textContent( )
    {
        $children =& $this->children();

        if ( count( $children ) == 1 )
        {
            return $children[0]->content();
        }
        else
            return false;
    }

    /*!
      Returns a XML string of the DOM Node and subnodes
    */
    function &toString( $level )
    {
        $spacer = str_repeat ( " ", $level*2 );
        $ret = "";
        switch ( $this->Name )
        {
            case "#text" :
            {
                $tagContent = $this->Content;

                $tagContent =& str_replace( "&", "&amp;", $tagContent );
                $tagContent =& str_replace( ">", "&gt;", $tagContent );
                $tagContent =& str_replace( "<", "&lt;", $tagContent );
                $tagContent =& str_replace( "'", "&apos;", $tagContent );
                $tagContent =& str_replace( '"', "&quot;", $tagContent );

                $ret =& $tagContent;
            }break;

            case "#cdata-section" :
            {
                $ret = "<![CDATA[";
                $ret .= $this->Content;
                $ret .= "]]>";
            }break;

            default :
            {
                $isOneLiner = false;
                // check if it's a oneliner
                if ( count( $this->Children ) == 0 and ( $this->Content == "" ) )
                    $isOneLiner = true;

                $attrStr = "";

                // check for namespace definition
                if ( $this->namespaceURI() != "" )
                {
                    $attrPrefix = "";
                    if ( $this->Prefix != "" )
                        $attrPrefix = ":" . $this->prefix();
                    $attrStr = " xmlns" . $attrPrefix . "=\"" . $this->namespaceURI() . "\"";
                }

                // generate attributes string
                if ( count( $this->Attributes ) > 0 )
                {
                    foreach ( $this->Attributes as $attr )
                    {
                        $attrPrefix = "";
                        if ( $attr->prefix() != false )
                            $attrPrefix = $attr->prefix(). ":";

                        $attrStr .= " " . $attrPrefix . $attr->name() . "=\"" . $attr->content() . "\" ";
                    }
                }

                if ( $isOneLiner )
                    $oneLinerEnd = " /";
                else
                    $oneLinerEnd = "";


                $prefix = "";
                if ( $this->Prefix != false )
                    $prefix = $this->Prefix. ":";

                $ret = "$spacer<" . $prefix . $this->Name . $attrStr . $oneLinerEnd . ">";

                if ( count( $this->Children ) > 0 )
                {
                    foreach ( $this->Children as $child )
                    {
                        $ret .= "\n" . $child->toString( $level + 1 );
                    }
                }

                if ( !$isOneLiner )
                    $ret .= "$spacer</" . $prefix . $this->Name . ">\n";
//                    $ret .= "$spacer</" . $prefix . $this->Name . ">\n";

            }break;
        }
        return $ret;
    }

    /// Name of the node
    var $Name;

    /// Type of the DOM node. ElementNode=1, AttributeNode=2, TextNode=3, CDATASectionNode=4
    var $Type;

    /// Content of the node
    var $Content = "";

    /// Subnodes
    var $Children = array();

    /// Attributes
    var $Attributes = array();

    /// Contains the namespace URI. E.g. xmlns="http://ez.no/article/", http://ez.no/article/ would be the namespace URI
    var $NamespaceURI = false;

    /// The local part of a name. E.g: book:title, title is the local part
    var $LocalName = false;

    /// contains the namespace prefix. E.g: book:title, book is the prefix
    var $Prefix = false;
}

?>
