//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GreatWarriorDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class Figure
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Figure()
        {
            this.FiguresInGames = new HashSet<FiguresInGame>();
            this.FiguresOfPlayers = new HashSet<FiguresOfPlayer>();
        }
    
        public string Figure_Name { get; set; }
        public byte[] Figure_Image { get; set; }
        public Nullable<byte> Figure_Attack { get; set; }
        public Nullable<byte> Figure_Defense { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FiguresInGame> FiguresInGames { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FiguresOfPlayer> FiguresOfPlayers { get; set; }
    }
}
